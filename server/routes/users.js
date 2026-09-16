import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getAllUsers, getUserById, updateUser, updateUserStatus,
  getMyProfile, updateMyProfile, getDashboardData
} from '../controllers/userController.js';

const router = express.Router();

// Learner routes
router.get('/me/profile', authenticate, getMyProfile);
router.put('/me/profile', authenticate, updateMyProfile);
router.get('/me/dashboard', authenticate, getDashboardData);

// Admin routes
router.get('/', authenticate, requireAdmin, getAllUsers);
router.get('/:id', authenticate, requireAdmin, getUserById);
router.put('/:id', authenticate, requireAdmin, updateUser);
router.patch('/:id/status', authenticate, requireAdmin, updateUserStatus);

export default router;
