import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';
import {
  uploadDocument, getDocuments, getDocumentById, generateQuestionsFromDoc,
} from '../controllers/documentController.js';
import {
  getQuestions, getQuestionById, createQuestion, updateQuestion,
  updateQuestionStatus, bulkUpdateStatus, getQuestionStats,
} from '../controllers/questionController.js';

const router = express.Router();

// Documents
router.post('/upload', authenticate, requireAdmin, upload.single('file'), handleUploadError, uploadDocument);
router.get('/', authenticate, requireAdmin, getDocuments);
router.get('/:id', authenticate, requireAdmin, getDocumentById);
router.post('/:id/generate-questions', authenticate, requireAdmin, generateQuestionsFromDoc);

export default router;
