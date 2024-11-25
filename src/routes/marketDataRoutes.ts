import { Router } from 'express';
import { fetchMarketData } from '../controllers/marketDataController';

const router = Router();

router.get('/market-data', fetchMarketData);

export default router;
