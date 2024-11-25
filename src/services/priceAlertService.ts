import redisClient from '../lib/redis';

export const setPriceAlert = async (userId: string, alert: any) => {
  const cacheKey = `priceAlert:${userId}`;
  await redisClient.set(cacheKey, JSON.stringify(alert));
};

export const getPriceAlert = async (userId: string) => {
  const cacheKey = `priceAlert:${userId}`;
  const cachedData = await redisClient.get(cacheKey);
  return cachedData ? JSON.parse(cachedData) : null;
};
