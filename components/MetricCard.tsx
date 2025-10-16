
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit: string;
  color: 'green' | 'cyan';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, unit, color }) => {
  const colorClasses = {
    green: {
      shadow: 'shadow-glow-green',
      text: 'text-brand-primary',
    },
    cyan: {
      shadow: 'shadow-glow-cyan',
      text: 'text-brand-secondary',
    },
  };

  const selectedColor = colorClasses[color];

  return (
    <div className={`bg-brand-surface border border-gray-800 rounded-lg p-5 flex items-center gap-5 transition-all duration-300 hover:border-gray-700 hover:-translate-y-1 ${selectedColor.shadow}`}>
      <div className={`p-3 rounded-lg bg-gray-900/50 ${selectedColor.text}`}>
        {icon}
      </div>
      <div>
        <p className="text-brand-text-secondary text-sm">{label}</p>
        <p className="text-3xl font-bold text-brand-text-primary tracking-tight">
          {value} <span className="text-xl font-medium text-brand-text-secondary">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
