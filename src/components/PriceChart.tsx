import { AssetHistory } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: AssetHistory[];
}

export const PriceChart = ({ data }: PriceChartProps) => {
  const formattedData = data.map(item => ({
    time: new Date(item.time).toLocaleDateString(),
    price: parseFloat(item.priceUsd)
  }));

  return (
    <div className="h-[400px] w-full neo-brutalist-card p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <XAxis dataKey="time" />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
            width={80}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'white',
              border: '3px solid black',
              borderRadius: '0px',
              fontFamily: 'Space Mono'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#000000" 
            fill="#FFE600"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};