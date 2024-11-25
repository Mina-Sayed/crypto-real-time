import express from 'express';
import { createClient } from 'redis';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

const redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

app.use(express.json());

app.get('/api/market-data', async (req, res) => {
  try {
    const cacheKey = 'marketData';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const response = await axios.get('https://api.coincap.io/v2/assets?limit=50');
    const marketData = response.data.data;

    await redisClient.set(cacheKey, JSON.stringify(marketData), {
      EX: 60
    });

    res.json(marketData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const { userId, portfolio } = req.body;
    const cacheKey = `portfolio:${userId}`;

    await redisClient.set(cacheKey, JSON.stringify(portfolio));

    res.status(200).json({ message: 'Portfolio saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
});

app.get('/api/portfolio/:userId', async (req, res) => {
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
});

app.post('/api/price-alert', async (req, res) => {
  try {
    const { userId, alert } = req.body;
    const cacheKey = `priceAlert:${userId}`;

    await redisClient.set(cacheKey, JSON.stringify(alert));

    res.status(200).json({ message: 'Price alert set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set price alert' });
  }
});

app.get('/api/price-alert/:userId', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
