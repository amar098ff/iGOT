import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getQuestions, getQuestionById, createQuestion, updateQuestion,
  updateQuestionStatus, bulkUpdateStatus, getQuestionStats,
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/stats', authenticate, requireAdmin, getQuestionStats);
router.get('/', authenticate, requireAdmin, getQuestions);
router.get('/:id', authenticate, requireAdmin, getQuestionById);
router.post('/', authenticate, requireAdmin, createQuestion);
router.put('/:id', authenticate, requireAdmin, updateQuestion);
router.patch('/:id/status', authenticate, requireAdmin, updateQuestionStatus);
router.post('/bulk/status', authenticate, requireAdmin, bulkUpdateStatus);

export default router;
