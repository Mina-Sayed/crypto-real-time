import { useState, useEffect } from "react";
import { Asset } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PriceAlertEntry {
  assetId: string;
  targetPrice: number;
  isAbove: boolean;
}

export const PriceAlert = ({ assets }: { assets: Asset[] }) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<PriceAlertEntry[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [isAbove, setIsAbove] = useState(true);

  const addAlert = () => {
    if (!selectedAsset || !targetPrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newAlert: PriceAlertEntry = {
      assetId: selectedAsset,
      targetPrice: parseFloat(targetPrice),
      isAbove,
    };

    setAlerts([...alerts, newAlert]);
    setSelectedAsset("");
    setTargetPrice("");

    toast({
      title: "Success",
      description: "Price alert added",
    });
  };

  const removeAlert = (index: number) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  // Check alerts against current prices using useEffect
  useEffect(() => {
    assets.forEach((asset) => {
      alerts.forEach((alert) => {
        if (alert.assetId === asset.id) {
          const currentPrice = parseFloat(asset.priceUsd);
          if (
            (alert.isAbove && currentPrice >= alert.targetPrice) ||
            (!alert.isAbove && currentPrice <= alert.targetPrice)
          ) {
            toast({
              title: "Price Alert!",
              description: `${asset.name} has ${
                alert.isAbove ? "reached" : "fallen to"
              } ${alert.targetPrice}`,
            });
          }
        }
      });
    });
  }, [assets, alerts, toast]);

  return (
    <div className="neo-brutalist-card p-4 mb-8">
      <h2 className="text-xl font-space-mono mb-4">Price Alerts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
          placeholder="Target Price"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
        />
        
        <select
          className="border border-input bg-background px-3 py-2"
          value={isAbove ? "above" : "below"}
          onChange={(e) => setIsAbove(e.target.value === "above")}
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        
        <Button onClick={addAlert}>Add Alert</Button>
      </div>

      <div className="space-y-2">
        {alerts.map((alert, index) => {
          const asset = assets.find((a) => a.id === alert.assetId);
          if (!asset) return null;
          
          return (
            <div key={index} className="flex justify-between items-center p-2 border border-border">
              <div>
                <p className="font-space-mono">{asset.name}</p>
                <p className="text-sm text-muted-foreground">
                  Alert when price is {alert.isAbove ? "above" : "below"} {alert.targetPrice}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeAlert(index)}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};