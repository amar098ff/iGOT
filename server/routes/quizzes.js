import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getQuizzes, getQuizById, createQuiz, updateQuiz,
  startQuizAttempt, submitQuizAttempt,
} from '../controllers/quizController.js';

const router = express.Router();

router.get('/', authenticate, getQuizzes);
router.get('/:id', authenticate, getQuizById);
router.post('/', authenticate, requireAdmin, createQuiz);
router.put('/:id', authenticate, requireAdmin, updateQuiz);
router.post('/:id/start', authenticate, startQuizAttempt);
router.post('/:id/submit', authenticate, submitQuizAttempt);

export default router;
