import { callAI } from './aiService.js';
import { PROMPTS } from './promptService.js';
import { validateMCQResponse } from './aiValidator.js';

/**
 * Generate MCQ questions from document text.
 * Questions are returned as AI_GENERATED status — never auto-published.
 */
export async function generateQuestionsFromDocument(documentText, config) {
  if (!documentText || documentText.trim().length < 100) {
    throw new Error('Document text is too short for question generation (minimum 100 characters)');
  }

  // Chunk text if too long (simple chunking for now)
  const maxChars = 8000;
  const textToUse = documentText.length > maxChars ? documentText.substring(0, maxChars) : documentText;

  const prompt = PROMPTS.MCQ_GENERATION({
    ...config,
    documentText: textToUse,
    questionCount: config.questionCount || 10,
  });

  let aiData;
  try {
    aiData = await callAI(prompt);
  } catch (error) {
    throw new Error(`AI question generation failed: ${error.message}`);
  }

  const { valid, errors } = validateMCQResponse(aiData);
  if (!valid) {
    console.error('MCQ validation errors:', errors);
    // Return partial results with warning rather than failing completely
  }

  // Ensure all questions have status AI_GENERATED
  const questions = (aiData.questions || []).map(q => ({
    ...q,
    status: 'AI_GENERATED',
    source: 'AI_GENERATED',
    language: config.language || 'English',
  }));

  return {
    questions,
    topicsIdentified: aiData.topicsIdentified || [],
    generatedCount: questions.length,
    validationWarnings: valid ? [] : errors,
  };
}

/**
 * Generate assessment questions for a specific skill
 */
export async function generateAssessmentQuestions(skillName, level, count = 5) {
  const prompt = PROMPTS.ASSESSMENT_QUESTIONS({ skillName, level, count });
  const aiData = await callAI(prompt);
  return aiData.questions || [];
}
