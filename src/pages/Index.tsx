import { useQuery } from "@tanstack/react-query";
import { getTopAssets } from "@/lib/api";
import { AssetCard } from "@/components/AssetCard";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { MarketOverview } from "@/components/MarketOverview";
import { Portfolio } from "@/components/Portfolio";
import { PriceAlert } from "@/components/PriceAlert";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [filter, setFilter] = useState("all");

  const { data: assets, error, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
    refetchInterval: 30000,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch cryptocurrency data",
          variant: "destructive",
        });
      },
    },
  });

  const filteredAndSortedAssets = useMemo(() => {
    if (!assets) return [];

    let result = [...assets];

    // Apply search filter
    if (search) {
      result = result.filter(
        (asset) =>
          asset.name.toLowerCase().includes(search.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (filter === "gainers") {
      result = result.filter((asset) => parseFloat(asset.changePercent24Hr) > 0);
    } else if (filter === "losers") {
      result = result.filter((asset) => parseFloat(asset.changePercent24Hr) < 0);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "priceDesc":
          return parseFloat(b.priceUsd) - parseFloat(a.priceUsd);
        case "priceAsc":
          return parseFloat(a.priceUsd) - parseFloat(b.priceUsd);
        case "change":
          return (
            parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
          );
        default:
          return parseInt(a.rank) - parseInt(b.rank);
      }
    });

    return result;
  }, [assets, search, sortBy, filter]);

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
      
      <MarketOverview />
      
      {assets && (
        <>
          <Portfolio assets={assets} />
          <PriceAlert assets={assets} />
        </>
      )}
      
      <SearchAndFilter
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onFilterChange={setFilter}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filteredAndSortedAssets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Index;