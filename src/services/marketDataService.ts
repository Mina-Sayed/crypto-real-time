import axios from 'axios';

const COINCAP_API_URL = 'https://api.coincap.io/v2';

export const getMarketData = async () => {
  try {
    const response = await axios.get(`${COINCAP_API_URL}/assets?limit=50`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch market data');
  }
};
