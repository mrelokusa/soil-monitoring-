import React from 'react';
import AnimatedNumber from './AnimatedNumber';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit: string;
  color: 'primary' | 'secondary';
}

const getMetricStatus = (label: string, value: number | string): { isLow: boolean } => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return { isLow: false };

    const thresholds: { [key: string]: number } = {
        'Soil Moisture': 25,
        'Soil Temperature': 10,
        'Soil Conductivity': 200,
        'Soil pH Level': 5.5,
        'Nitrogen': 50,
        'Phosphorus': 20,
        'Potassium': 100,
    };

    const threshold = thresholds[label];
    return {
        isLow: threshold !== undefined && numValue < threshold,
    };
};

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, unit, color }) => {
  
  const { isLow } = getMetricStatus(label, value);

  const colorClasses = {
    primary: {
        text: 'text-brand-primary dark:text-dark-brand-primary',
        shadow: 'dark:shadow-glow-green',
    },
    secondary: {
        text: 'text-brand-secondary dark:text-dark-brand-secondary',
        shadow: 'dark:shadow-glow-cyan',
    }
  }

  const selectedColor = colorClasses[color];

  const lowValueClasses = isLow 
    ? 'border-red-500/80 dark:border-red-500 animate-pulse-warning shadow-lg dark:shadow-glow-red' 
    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 dark:shadow-none';

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const toFixed = ['Soil Moisture', 'Soil Temperature', 'Soil pH Level'].includes(label) ? 1 : 0;

  return (
    <div className={`bg-brand-surface dark:bg-dark-brand-surface border rounded-lg p-5 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md ${selectedColor.shadow} ${lowValueClasses}`}>
      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-900/50 ${selectedColor.text}`}>
        {icon}
      </div>
      <div>
        <p className="text-brand-text-secondary dark:text-dark-brand-text-secondary text-sm">{label}</p>
        <p className={`text-3xl font-bold tracking-tight ${isLow ? 'text-red-500 dark:text-red-400' : 'text-brand-text-primary dark:text-dark-brand-text-primary'}`}>
          {typeof numValue === 'number' && !isNaN(numValue) ? (
            <AnimatedNumber value={numValue} toFixed={toFixed} />
          ) : (
            value
          )}{' '}
          <span className="text-xl font-medium text-brand-text-secondary dark:text-dark-brand-text-secondary">{unit}</span>
        </p>
        {isLow && (
          <p className="mt-1 text-xs font-semibold text-red-500 dark:text-red-400 animate-pulse">
            Alert: Low {label.replace('Soil ', '')}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;