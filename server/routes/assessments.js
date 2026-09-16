import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getAssessments, getAssessmentById, createAssessment, updateAssessment,
  startAttempt, submitAttempt, getAttemptResult,
} from '../controllers/assessmentController.js';

const router = express.Router();

router.get('/', authenticate, getAssessments);
router.get('/:id', authenticate, getAssessmentById);
router.post('/', authenticate, requireAdmin, createAssessment);
router.put('/:id', authenticate, requireAdmin, updateAssessment);

router.post('/:id/attempt', authenticate, startAttempt);
router.post('/:id/attempt/:attemptId/submit', authenticate, submitAttempt);

router.get('/results/:id', authenticate, getAttemptResult);

export default router;
