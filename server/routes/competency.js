import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  getDomains, createDomain, updateDomain, deleteDomain,
  getCompetencies, createCompetency, updateCompetency,
  getSkills, createSkill, updateSkill,
  getTopics, createTopic,
  getRoles, createRole, updateRole,
  getFrameworkTree,
} from '../controllers/competencyController.js';

const router = express.Router();

router.get('/tree', authenticate, getFrameworkTree);

router.get('/domains', authenticate, getDomains);
router.post('/domains', authenticate, requireAdmin, createDomain);
router.put('/domains/:id', authenticate, requireAdmin, updateDomain);
router.delete('/domains/:id', authenticate, requireAdmin, deleteDomain);

router.get('/competencies', authenticate, getCompetencies);
router.post('/competencies', authenticate, requireAdmin, createCompetency);
router.put('/competencies/:id', authenticate, requireAdmin, updateCompetency);

router.get('/skills', authenticate, getSkills);
router.post('/skills', authenticate, requireAdmin, createSkill);
router.put('/skills/:id', authenticate, requireAdmin, updateSkill);

router.get('/topics', authenticate, getTopics);
router.post('/topics', authenticate, requireAdmin, createTopic);

router.get('/roles', authenticate, getRoles);
router.post('/roles', authenticate, requireAdmin, createRole);
router.put('/roles/:id', authenticate, requireAdmin, updateRole);

export default router;
