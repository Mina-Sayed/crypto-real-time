import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2'
});

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
}

export const getTopAssets = async () => {
  const response = await api.get('/assets?limit=50');
  return response.data.data;
};

export const getAssetHistory = async (id: string, interval: string) => {
  const response = await api.get(`/assets/${id}/history?interval=${interval}`);
  return response.data.data;
};

export const getAssetDetails = async (id: string) => {
  const response = await api.get(`/assets/${id}`);
  return response.data.data;
};