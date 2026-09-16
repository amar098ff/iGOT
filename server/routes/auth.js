import express from 'express';
import {
  register, login, getMe, updateOnboarding, completeOnboarding
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.put('/onboarding', authenticate, updateOnboarding);
router.post('/onboarding/complete', authenticate, completeOnboarding);

export default router;
