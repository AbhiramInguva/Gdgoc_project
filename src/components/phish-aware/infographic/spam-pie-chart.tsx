'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SpamCategory {
  category: string;
  percentage: number;
  count: number;
  color: string;
}

interface SpamPieChartProps {
  data: SpamCategory[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/80 backdrop-blur-sm p-2 border border-border rounded-lg shadow-lg">
          <p className="font-bold text-foreground">{`${data.category}`}</p>
          <p className="text-sm text-muted-foreground">{`Count: ${data.count.toLocaleString()}`}</p>
          <p className="text-sm text-muted-foreground">{`Percentage: ${data.percentage}%`}</p>
        </div>
      );
    }
  
    return null;
  };

export function SpamPieChart({ data }: SpamPieChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="percentage"
            nameKey="category"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{fontSize: "12px"}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
