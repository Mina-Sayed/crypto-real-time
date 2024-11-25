import { Request, Response } from 'express';
import redisClient from '../lib/redis';

export const savePortfolio = async (req: Request, res: Response) => {
  try {
    const { userId, portfolio } = req.body;
    const cacheKey = `portfolio:${userId}`;

    await redisClient.set(cacheKey, JSON.stringify(portfolio));

    res.status(200).json({ message: 'Portfolio saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
};

export const getPortfolio = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cacheKey = `portfolio:${userId}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    res.status(404).json({ error: 'Portfolio not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
};
