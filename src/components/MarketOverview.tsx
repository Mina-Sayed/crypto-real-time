import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatCurrency } from "@/lib/utils";

interface GlobalData {
  totalMarketCap: string;
  volume24Hr: string;
  btcDominance: string;
}

export const MarketOverview = () => {
  const { data: globalData } = useQuery({
    queryKey: ["globalData"],
    queryFn: async () => {
      const response = await axios.get("https://api.coincap.io/v2/global");
      const data = response.data.data;
      return {
        totalMarketCap: data.marketCapUsd,
        volume24Hr: data.volume24HrUsd,
        btcDominance: ((parseFloat(data.btcDominance) || 0).toFixed(2) + "%"),
      };
    },
    refetchInterval: 30000,
  });

  if (!globalData) return null;

  return (
    <div className="neo-brutalist-card p-4 mb-8">
      <h2 className="text-xl font-space-mono mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Market Cap</p>
          <p className="font-space-mono text-lg">{formatCurrency(parseFloat(globalData.totalMarketCap))}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <p className="font-space-mono text-lg">{formatCurrency(parseFloat(globalData.volume24Hr))}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">BTC Dominance</p>
          <p className="font-space-mono text-lg">{globalData.btcDominance}</p>
        </div>
      </div>
    </div>
  );
};