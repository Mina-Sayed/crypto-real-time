import redisClient from '../lib/redis';

export const savePortfolio = async (userId: string, portfolio: any) => {
  const cacheKey = `portfolio:${userId}`;
  await redisClient.set(cacheKey, JSON.stringify(portfolio));
};

export const getPortfolio = async (userId: string) => {
  const cacheKey = `portfolio:${userId}`;
  const cachedData = await redisClient.get(cacheKey);
  return cachedData ? JSON.parse(cachedData) : null;
};
