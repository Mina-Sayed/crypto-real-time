import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAssetDetails, getAssetHistory } from '@/lib/api';
import { PriceChart } from '@/components/PriceChart';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const AssetDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: asset } = useQuery({
    queryKey: ['asset', id],
    queryFn: () => getAssetDetails(id!),
    enabled: !!id,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch asset details",
        variant: "destructive"
      });
    }
  });

  const { data: history } = useQuery({
    queryKey: ['assetHistory', id],
    queryFn: () => getAssetHistory(id!, 'h1'),
    enabled: !!id,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch price history",
        variant: "destructive"
      });
    }
  });

  if (!asset || !history) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Loading...</h1>
      </div>
    );
  }

  const priceChange = parseFloat(asset.changePercent24Hr);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{asset.name}</h1>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">{formatCurrency(parseFloat(asset.priceUsd))}</p>
          <p className={`text-xl ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
          </p>
        </div>
      </div>

      <PriceChart data={history} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="neo-brutalist-card p-4">
          <h3 className="font-bold mb-2">Market Cap</h3>
          <p className="font-space-mono">{formatCurrency(parseFloat(asset.marketCapUsd))}</p>
        </div>
        <div className="neo-brutalist-card p-4">
          <h3 className="font-bold mb-2">24h Volume</h3>
          <p className="font-space-mono">{formatCurrency(parseFloat(asset.volumeUsd24Hr))}</p>
        </div>
        <div className="neo-brutalist-card p-4">
          <h3 className="font-bold mb-2">Supply</h3>
          <p className="font-space-mono">
            {parseInt(asset.supply).toLocaleString()} {asset.symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;