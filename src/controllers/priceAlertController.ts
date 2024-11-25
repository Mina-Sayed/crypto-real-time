import { Request, Response } from 'express';
import redisClient from '../lib/redis';

export const setPriceAlert = async (req: Request, res: Response) => {
  try {
    const { userId, alert } = req.body;
    const cacheKey = `priceAlert:${userId}`;

    await redisClient.set(cacheKey, JSON.stringify(alert));

    res.status(200).json({ message: 'Price alert set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set price alert' });
  }
};

export const getPriceAlert = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cacheKey = `priceAlert:${userId}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    res.status(404).json({ error: 'Price alert not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price alert' });
  }
};
