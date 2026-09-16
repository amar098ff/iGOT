import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getMySkillGaps, analyzeGaps, getMyRecommendations,
  generatePersonalizedRecommendations, updateRecommendationStatus,
} from '../controllers/gapRecommendationController.js';

const router = express.Router();

// Skill gaps
router.get('/gaps', authenticate, getMySkillGaps);
router.post('/gaps/analyze', authenticate, analyzeGaps);

// Recommendations
router.get('/recommendations', authenticate, getMyRecommendations);
router.post('/recommendations/generate', authenticate, generatePersonalizedRecommendations);
router.patch('/recommendations/:id/status', authenticate, updateRecommendationStatus);

export default router;
