import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getCourses, getCourseById, createCourse, updateCourse,
  enrollInCourse, updateCourseProgress, getMyProgress,
} from '../controllers/courseController.js';

const router = express.Router();

router.get('/me/progress', authenticate, getMyProgress);
router.get('/', authenticate, getCourses);
router.get('/:id', authenticate, getCourseById);
router.post('/', authenticate, requireAdmin, createCourse);
router.put('/:id', authenticate, requireAdmin, updateCourse);
router.post('/:id/enroll', authenticate, enrollInCourse);
router.put('/:id/progress', authenticate, updateCourseProgress);

export default router;
