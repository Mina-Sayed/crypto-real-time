import { Asset } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  const priceChange = parseFloat(asset.changePercent24Hr);
  
  return (
    <Link to={`/asset/${asset.id}`}>
      <div className="neo-brutalist-card p-4 cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-primary font-space-mono font-bold">
              {asset.rank}
            </div>
            <div className="text-left">
              <h3 className="font-space-mono font-bold">{asset.name}</h3>
              <p className="text-sm text-muted-foreground">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-space-mono font-bold">{formatCurrency(parseFloat(asset.priceUsd))}</p>
            <p className={`text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};