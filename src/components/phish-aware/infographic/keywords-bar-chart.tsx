'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface KeywordData {
  keyword: string;
  occurrence_rate: number;
}

interface KeywordsBarChartProps {
  data: KeywordData[];
}

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-2 border border-border rounded-lg shadow-lg">
          <p className="font-bold text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{`Occurrence Rate: ${(payload[0].value * 100).toFixed(0)}%`}</p>
        </div>
      );
    }
  
    return null;
};

export function KeywordsBarChart({ data }: KeywordsBarChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="keyword" type="category" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} width={120} />
          <Tooltip cursor={{fill: 'hsla(var(--card), 0.5)'}} content={<CustomTooltip />} />
          <Bar dataKey="occurrence_rate" barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
