import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
} from '../controllers/projectController.js';
import authMiddleware from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/role.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', adminMiddleware, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', adminMiddleware, updateProject);
router.delete('/:id', adminMiddleware, deleteProject);
router.post('/:id/members', adminMiddleware, addMember);

export default router;
