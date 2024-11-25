import { Request, Response, NextFunction } from 'express';
import redisClient from '../lib/redis';

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = req.originalUrl;

  redisClient.get(cacheKey, (err, data) => {
    if (err) {
      console.error('Redis error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (data) {
      return res.json(JSON.parse(data));
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      redisClient.set(cacheKey, JSON.stringify(body), 'EX', 60);
      res.sendResponse(body);
    };

    next();
  });
};
