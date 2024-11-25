import express from 'express';
import { setPriceAlert, getPriceAlert } from '../controllers/priceAlertController';

const router = express.Router();

router.post('/api/price-alert', setPriceAlert);
router.get('/api/price-alert/:userId', getPriceAlert);

export default router;
