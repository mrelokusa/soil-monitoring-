
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { SoilData } from '../types';
import { NitrogenIcon, PhosphorusIcon, PotassiumIcon } from './Icons';

interface NPKChartProps {
  data: SoilData;
}

const NPKChart: React.FC<NPKChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Nitrogen', value: data.nitrogen, unit: 'mg/kg', color: '#4ADE80' },
    { name: 'Phosphorus', value: data.phosphorus, unit: 'mg/kg', color: '#22D3EE' },
    { name: 'Potassium', value: data.potassium, unit: 'mg/kg', color: '#A78BFA' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-surface/80 backdrop-blur-sm border border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="font-bold text-brand-text-primary">{`${label}`}</p>
          <p style={{ color: payload[0].payload.color }}>
            {`Value: ${payload[0].value} ${payload[0].payload.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-brand-surface border border-gray-800 rounded-lg p-5 col-span-1 md:col-span-2 lg:col-span-4 h-80 transition-all duration-300 hover:border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold text-brand-text-primary mb-4 flex items-center gap-4">
            <span className="flex items-center gap-2"><NitrogenIcon /> N</span>
            <span className="flex items-center gap-2"><PhosphorusIcon /> P</span>
            <span className="flex items-center gap-2"><PotassiumIcon /> K</span>
            <span className="text-brand-text-secondary font-medium">Nutrient Levels</span>
        </h2>
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 14 }} />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 14 }} label={{ value: 'mg/kg', angle: -90, position: 'insideLeft', fill: '#9CA3AF', dy: 40, dx: -5 }}/>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
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
