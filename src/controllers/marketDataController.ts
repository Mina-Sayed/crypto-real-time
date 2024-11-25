import { Request, Response } from 'express';
import { getMarketData } from '../services/marketDataService';
import redisClient from '../lib/redis';

export const fetchMarketData = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'marketData';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const marketData = await getMarketData();

    await redisClient.set(cacheKey, JSON.stringify(marketData), {
      EX: 60
    });

    res.json(marketData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
};
