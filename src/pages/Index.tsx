import { useQuery } from '@tanstack/react-query';
import { getTopAssets } from '@/lib/api';
import { AssetCard } from '@/components/AssetCard';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const { data: assets, error, isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: getTopAssets,
    refetchInterval: 30000,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch cryptocurrency data",
          variant: "destructive"
        });
      }
    }
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Top Cryptocurrencies</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {assets?.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Index;