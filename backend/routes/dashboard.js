import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getStats, getAnalytics } from '../controllers/dashboardController.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/stats', getStats);
router.get('/analytics', getAnalytics);

export default router;
