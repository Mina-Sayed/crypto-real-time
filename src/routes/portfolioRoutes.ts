import express from 'express';
import { savePortfolio, getPortfolio } from '../controllers/portfolioController';

const router = express.Router();

router.post('/portfolio', savePortfolio);
router.get('/portfolio/:userId', getPortfolio);

export default router;
