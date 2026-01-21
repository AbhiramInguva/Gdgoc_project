'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AttachmentData {
  type: string;
  percentage: number;
}

interface AttachmentsBarChartProps {
  data: AttachmentData[];
}

const colors = ["#DC2626", "#F97316", "#F59E0B", "#EAB308", "#84CC16"];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-2 border border-border rounded-lg shadow-lg">
          <p className="font-bold text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{`Share: ${payload[0].value}%`}</p>
        </div>
      );
    }
  
    return null;
};

export function AttachmentsBarChart({ data }: AttachmentsBarChartProps) {
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="type" type="category" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} width={80}/>
          <Tooltip cursor={{fill: 'hsla(var(--card), 0.5)'}} content={<CustomTooltip />} />
          <Bar dataKey="percentage" barSize={20}>
            {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
