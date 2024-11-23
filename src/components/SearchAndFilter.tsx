import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAndFilterProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const SearchAndFilter = ({
  onSearchChange,
  onSortChange,
  onFilterChange,
}: SearchAndFilterProps) => {
  return (
    <div className="neo-brutalist-card p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-space-mono mb-2">Search</label>
          <Input
            id="search"
            placeholder="Search cryptocurrencies..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-space-mono mb-2">Sort By</label>
          <Select onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="priceDesc">Price (High to Low)</SelectItem>
              <SelectItem value="priceAsc">Price (Low to High)</SelectItem>
              <SelectItem value="change">24h Change</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="filter" className="block text-sm font-space-mono mb-2">Filter</label>
          <Select onValueChange={onFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="gainers">Top Gainers</SelectItem>
              <SelectItem value="losers">Top Losers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};