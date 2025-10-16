import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SoilData } from '../types';

interface HistoricalDataChartProps {
  data: SoilData[];
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-surface/80 backdrop-blur-sm border border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="font-bold text-brand-text-secondary">{`Time: ${label}`}</p>
          <p style={{ color: payload[0].stroke }} className="text-sm font-semibold">
            {`${payload[0].name}: ${payload[0].value} ${unit || ''}`}
          </p>
        </div>
      );
    }
    return null;
};

const HistoricalDataChart: React.FC<HistoricalDataChartProps> = ({ data }) => {
    // Reverse data for a left-to-right time series and format time for the x-axis
    const chartData = [...data].reverse().map(d => ({
        ...d,
        time: new Date(d.inserted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }));

    const charts = [
        { key: 'moisture', name: 'Moisture', unit: '%', color: '#22D3EE' },
        { key: 'temperature', name: 'Temperature', unit: '°C', color: '#4ADE80' },
        { key: 'ec', name: 'Conductivity', unit: 'uS/cm', color: '#22D3EE' },
        { key: 'ph', name: 'pH Level', unit: '', color: '#4ADE80' },
    ];

  return (
    <div className="bg-brand-surface border border-gray-800 rounded-lg p-5 col-span-1 lg:col-span-4 transition-all duration-300 hover:border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold text-brand-text-primary mb-6">Historical Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 h-[400px]">
            {charts.map(chart => (
                 <div key={chart.key}>
                    <h3 className="text-brand-text-secondary mb-2 text-center text-sm font-medium">{chart.name} Trend</h3>
                    <ResponsiveContainer width="100%" height={160}>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} interval={4} />
                            <YAxis 
                                stroke="#9CA3AF" 
                                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                                domain={['auto', 'auto']}
                                label={chart.unit ? { value: chart.unit, angle: -90, position: 'insideLeft', fill: '#9CA3AF', style: { fontSize: '14px', textAnchor: 'middle' } } : undefined}
                            />
                            <Tooltip content={<CustomTooltip unit={chart.unit} />} cursor={{ stroke: '#4b5563', strokeWidth: 1 }} />
                            <Line
                                type="monotone"
                                dataKey={chart.key}
                                name={chart.name}
                                stroke={chart.color}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                 </div>
            ))}
        </div>
    </div>
  );
};

export default HistoricalDataChart;