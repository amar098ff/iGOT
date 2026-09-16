import { Document } from '../models/ContentModels.js';
import Question from '../models/Question.js';
import { generateQuestionsFromDocument } from '../services/ai/quizGenerationService.js';
import { AuditLog, Notification } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

const extractText = async (filePath, mimeType) => {
  const buffer = fs.readFileSync(filePath);

  if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimeType === 'text/plain') {
    return buffer.toString('utf-8');
  }

  throw new Error(`Unsupported file type for text extraction: ${mimeType}`);
};

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  const { title, description, category, course } = req.body;
  const ext = path.extname(req.file.originalname).toUpperCase().replace('.', '');

  const document = await Document.create({
    title: title || req.file.originalname,
    description,
    originalName: req.file.originalname,
    fileName: req.file.filename,
    filePath: req.file.path,
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
    fileType: ext === 'DOCX' || ext === 'DOC' ? ext : ext,
    category,
    course: course || undefined,
    processingStatus: 'PENDING',
    uploadedBy: req.user._id,
  });

  // Process text extraction asynchronously
  processDocument(document._id, req.file.path, req.file.mimetype);

  await AuditLog.create({
    user: req.user._id,
    action: 'DOCUMENT_UPLOAD',
    resource: 'Document',
    resourceId: document._id.toString(),
    details: { fileName: req.file.originalname, size: req.file.size },
    status: 'SUCCESS',
  });

  res.status(201).json({
    success: true,
    message: 'Document uploaded. Text extraction in progress.',
    data: document,
  });
});

async function processDocument(docId, filePath, mimeType) {
  try {
    await Document.findByIdAndUpdate(docId, { processingStatus: 'PROCESSING' });
    const text = await extractText(filePath, mimeType);

    // Simple chunking: split into ~500-word chunks
    const words = text.split(/\s+/);
    const chunkSize = 500;
    const chunks = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }

    // Extract topics (simple keyword extraction)
    const topicKeywords = ['introduction', 'methodology', 'analysis', 'survey', 'data', 'statistics', 'results', 'conclusion'];
    const topics = topicKeywords.filter(kw => text.toLowerCase().includes(kw));

    await Document.findByIdAndUpdate(docId, {
      extractedText: text,
      extractedChunks: chunks,
      wordCount: words.length,
      topics,
      processingStatus: 'PROCESSED',
    });

    console.log(`[Document] Processed ${docId}: ${words.length} words, ${chunks.length} chunks`);
  } catch (error) {
    await Document.findByIdAndUpdate(docId, {
      processingStatus: 'FAILED',
      processingError: error.message,
    });
    console.error(`[Document] Processing failed for ${docId}:`, error.message);
  }
}

export const getDocuments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, category } = req.query;
  const query = {};
  if (status) query.status = status;
  if (category) query.category = { $regex: category, $options: 'i' };

  const total = await Document.countDocuments(query);
  const documents = await Document.find(query)
    .populate('uploadedBy', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    success: true,
    data: documents,
    pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
  });
});

export const getDocumentById = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id).populate('uploadedBy', 'name');
  if (!document) return res.status(404).json({ success: false, message: 'Document not found.' });
  res.json({ success: true, data: document });
});

export const generateQuestionsFromDoc = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) return res.status(404).json({ success: false, message: 'Document not found.' });

  if (document.processingStatus !== 'PROCESSED') {
    return res.status(400).json({
      success: false,
      message: `Document is not ready for question generation. Status: ${document.processingStatus}`,
    });
  }

  if (!document.extractedText) {
    return res.status(400).json({ success: false, message: 'Document has no extracted text.' });
  }

  const { questionCount = 10, difficulty = 'MEDIUM', questionType = 'MCQ_SINGLE', skill, competency, topics, language = 'English' } = req.body;

  const config = {
    questionCount: Math.min(parseInt(questionCount), 20),
    difficulty,
    questionType,
    skillName: skill?.name,
    competencyName: competency?.name,
    topics,
    language,
  };

  let generationResult;
  try {
    generationResult = await generateQuestionsFromDocument(document.extractedText, config);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

  // Save questions with AI_GENERATED status — NEVER auto-publish
  const savedQuestions = await Question.insertMany(
    generationResult.questions.map(q => ({
      ...q,
      skill: skill?._id,
      competency: competency?._id,
      sourceDocument: document._id,
      status: 'AI_GENERATED',
      source: 'AI_GENERATED',
      createdBy: req.user._id,
    }))
  );

  // Update document stats
  await Document.findByIdAndUpdate(document._id, {
    $inc: { generatedQuestionsCount: savedQuestions.length },
    topics: generationResult.topicsIdentified,
  });

  await AuditLog.create({
    user: req.user._id,
    action: 'QUESTIONS_GENERATED',
    resource: 'Document',
    resourceId: document._id.toString(),
    details: { count: savedQuestions.length, difficulty, documentTitle: document.title },
    status: 'SUCCESS',
  });

  res.status(201).json({
    success: true,
    message: `Generated ${savedQuestions.length} questions for review. They have AI_GENERATED status and require admin approval before publishing.`,
    data: {
      questionsGenerated: savedQuestions.length,
      topicsIdentified: generationResult.topicsIdentified,
      questions: savedQuestions,
      warnings: generationResult.validationWarnings,
    }
  });
});
