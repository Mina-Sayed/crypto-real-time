import { useState } from "react";
import { Asset } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface PortfolioEntry {
  assetId: string;
  amount: number;
  buyPrice: number;
}

export const Portfolio = ({ assets }: { assets: Asset[] }) => {
  const { toast } = useToast();
  const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [amount, setAmount] = useState("");

  const addToPortfolio = () => {
    if (!selectedAsset || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const asset = assets.find((a) => a.id === selectedAsset);
    if (!asset) return;

    const newEntry: PortfolioEntry = {
      assetId: selectedAsset,
      amount: parseFloat(amount),
      buyPrice: parseFloat(asset.priceUsd),
    };

    setPortfolio([...portfolio, newEntry]);
    setSelectedAsset("");
    setAmount("");

    toast({
      title: "Success",
      description: "Added to portfolio",
    });
  };

  const getTotalValue = () => {
    return portfolio.reduce((total, entry) => {
      const asset = assets.find((a) => a.id === entry.assetId);
      if (!asset) return total;
      return total + entry.amount * parseFloat(asset.priceUsd);
    }, 0);
  };

  const getProfitLoss = () => {
    return portfolio.reduce((total, entry) => {
      const asset = assets.find((a) => a.id === entry.assetId);
      if (!asset) return total;
      const currentValue = entry.amount * parseFloat(asset.priceUsd);
      const buyValue = entry.amount * entry.buyPrice;
      return total + (currentValue - buyValue);
    }, 0);
  };

  return (
    <div className="neo-brutalist-card p-4 mb-8">
      <h2 className="text-xl font-space-mono mb-4">Portfolio Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          className="border border-input bg-background px-3 py-2"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="">Select Asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name}
            </option>
          ))}
        </select>
        
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <Button onClick={addToPortfolio}>Add to Portfolio</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="font-space-mono text-lg">{formatCurrency(getTotalValue())}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Profit/Loss</p>
          <p className={`font-space-mono text-lg ${getProfitLoss() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(getProfitLoss())}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-space-mono mb-2">Holdings</h3>
        <div className="space-y-2">
          {portfolio.map((entry, index) => {
            const asset = assets.find((a) => a.id === entry.assetId);
            if (!asset) return null;
            
            const currentValue = entry.amount * parseFloat(asset.priceUsd);
            const profitLoss = currentValue - (entry.amount * entry.buyPrice);
            
            return (
              <div key={index} className="flex justify-between items-center p-2 border border-border">
                <div>
                  <p className="font-space-mono">{asset.name}</p>
                  <p className="text-sm text-muted-foreground">{entry.amount} {asset.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-space-mono">{formatCurrency(currentValue)}</p>
                  <p className={`text-sm ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(profitLoss)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};