import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts';
import { SoilData } from '../types';

interface NPKChartProps {
  data: SoilData;
  theme: 'light' | 'dark';
}

const NPKChart: React.FC<NPKChartProps> = ({ data, theme }) => {
  
  const lowThresholds = {
    nitrogen: 50,
    phosphorus: 20,
    potassium: 100,
  };

  const colors = {
    default: {
        nitrogen: '#4CAF50', // Earthy Green
        phosphorus: '#795548', // Warm Brown
        potassium: '#A78BFA' // Purple (Kept for contrast)
    },
    warning: '#EF4444' // Red-500
  };

  const chartData = [
    { name: 'Nitrogen', value: data.nitrogen, unit: 'mg/kg', color: data.nitrogen < lowThresholds.nitrogen ? colors.warning : colors.default.nitrogen },
    { name: 'Phosphorus', value: data.phosphorus, unit: 'mg/kg', color: data.phosphorus < lowThresholds.phosphorus ? colors.warning : colors.default.phosphorus },
    { name: 'Potassium', value: data.potassium, unit: 'mg/kg', color: data.potassium < lowThresholds.potassium ? colors.warning : colors.default.potassium },
  ];
  
  const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-surface/80 dark:bg-dark-brand-surface/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="font-bold text-brand-text-primary dark:text-dark-brand-text-primary">{`${label}`}</p>
          <p style={{ color: payload[0].payload.color }}>
            {`Value: ${payload[0].value} ${payload[0].payload.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-800 rounded-lg p-5 h-80 transition-all duration-300 hover:border-gray-300 dark:hover-border-gray-700 shadow-sm hover:shadow-md dark:shadow-none">
        <h2 className="text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary mb-4">
            Nutrient Balance
        </h2>
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="name" stroke={tickColor} tick={{ fill: tickColor, fontSize: 14 }} />
                <YAxis 
                    stroke={tickColor} 
                    tick={{ fill: tickColor, fontSize: 14 }} 
                    label={{ value: 'mg/kg', angle: -90, position: 'insideLeft', fill: tickColor, style: { textAnchor: 'middle' }, dy: 40, dx: -5 }}
                    domain={[0, 200]}
                    allowDataOverflow={true}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}/>
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="value" position="top" style={{ fill: tickColor, fontSize: 12 }} />
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default NPKChart;