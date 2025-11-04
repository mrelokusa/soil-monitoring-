import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SoilData, GreenhouseData } from '../types';

type Theme = 'light' | 'dark';

interface HistoricalDataChartProps {
  soilData: SoilData[];
  greenhouseData: GreenhouseData[];
  theme: Theme;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const hoveredMetricName = payload[0].name;
      const isSoilData = 'moisture' in dataPoint;
      const title = isSoilData ? 'Soil Snapshot' : 'Greenhouse Snapshot';
      const time = label;

      return (
        <div className="bg-brand-surface/95 dark:bg-dark-brand-surface/95 backdrop-blur-sm border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-xl text-base transition-all text-brand-text-primary dark:text-dark-brand-text-primary w-56">
          <p className="font-bold text-lg mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">{title} at {time}</p>
          <div className="space-y-2">
            {isSoilData ? (
              <>
                <div className={`flex justify-between ${hoveredMetricName === 'Soil Moisture' ? 'font-bold text-brand-secondary dark:text-dark-brand-secondary' : ''}`}><span>Moisture:</span> <span>{dataPoint.moisture.toFixed(1)}%</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Soil Temperature' ? 'font-bold text-brand-primary dark:text-dark-brand-primary' : ''}`}><span>Temperature:</span> <span>{dataPoint.temperature.toFixed(1)}°C</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Soil Conductivity' ? 'font-bold text-brand-secondary dark:text-dark-brand-secondary' : ''}`}><span>Conductivity:</span> <span>{dataPoint.ec} uS/cm</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Soil pH Level' ? 'font-bold text-brand-primary dark:text-dark-brand-primary' : ''}`}><span>pH Level:</span> <span>{dataPoint.ph.toFixed(1)}</span></div>
              </>
            ) : (
              <>
                <div className={`flex justify-between ${hoveredMetricName === 'Greenhouse Temp' ? 'font-bold text-orange-500' : ''}`}><span>Temperature:</span> <span>{dataPoint.temperature.toFixed(1)}°C</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Greenhouse Humidity' ? 'font-bold text-blue-500' : ''}`}><span>Humidity:</span> <span>{dataPoint.humidity.toFixed(1)}%</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Air Pressure' ? 'font-bold text-violet-500' : ''}`}><span>Pressure:</span> <span>{dataPoint.pressure.toFixed(1)} hPa</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Altitude' ? 'font-bold text-emerald-500' : ''}`}><span>Altitude:</span> <span>{dataPoint.altitude.toFixed(1)} m</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Light Intensity' ? 'font-bold text-amber-500' : ''}`}><span>Light:</span> <span>{dataPoint.lightRaw}</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Air Quality (MQ135)' ? 'font-bold text-slate-500' : ''}`}><span>Air Quality:</span> <span>{dataPoint.airQualityRaw}</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'Smoke (MQ2)' ? 'font-bold text-red-500' : ''}`}><span>Smoke:</span> <span>{dataPoint.smokeRaw}</span></div>
                <div className={`flex justify-between ${hoveredMetricName === 'CO (MQ7)' ? 'font-bold text-fuchsia-500' : ''}`}><span>CO:</span> <span>{dataPoint.coRaw}</span></div>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
};

interface TrendChartProps {
    title: string;
    data: any[];
    dataKey: string;
    name: string;
    unit: string;
    color: string;
    theme: Theme;
}

const TrendChart: React.FC<TrendChartProps> = ({title, data, dataKey, name, unit, color, theme}) => {
    const tickColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';
    
    // Calculate a dynamic Y-axis domain to "zoom in" on the data range.
    const yAxisDomain = React.useMemo(() => {
        const values = data.map(item => item[dataKey]).filter(v => typeof v === 'number' && !isNaN(v));

        if (values.length < 2) {
            return ['auto', 'auto']; // Fallback for insufficient data
        }

        const dataMin = Math.min(...values);
        const dataMax = Math.max(...values);
        
        // Handle case where all data points are the same
        if (dataMin === dataMax) {
            const absValue = Math.abs(dataMin);
            // Provide a small, reasonable range around the single value
            const padding = absValue > 10 ? absValue * 0.1 : 1;
            return [dataMin - padding, dataMax + padding];
        }

        const range = dataMax - dataMin;
        // Add 15% padding to the top and bottom
        const padding = range * 0.15; 

        // For small positive values, avoid the domain dipping into negative numbers.
        const domainMin = dataMin > 0 && (dataMin - padding < 0) ? 0 : Math.floor(dataMin - padding);
        const domainMax = Math.ceil(dataMax + padding);
        
        // Final sanity check
        if(domainMin >= domainMax) {
            return ['auto', 'auto'];
        }

        return [domainMin, domainMax];
    }, [data, dataKey]);

    return (
        <div>
            <h3 className="text-brand-text-secondary dark:text-dark-brand-text-secondary mb-2 text-center text-base font-medium">{title}</h3>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="time" stroke={tickColor} tick={{ fill: tickColor, fontSize: 14 }} interval="preserveStartEnd" tickFormatter={(tick) => tick.split(' ')[0]} />
                    <YAxis 
                        stroke={tickColor}
                        tick={{ fill: tickColor, fontSize: 14 }} 
                        domain={yAxisDomain}
                        allowDataOverflow={true}
                        label={{ value: unit, angle: -90, position: 'insideLeft', fill: tickColor, style: { fontSize: '14px', textAnchor: 'middle' } }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9CA3AF', strokeWidth: 1 }} />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        name={name}
                        stroke={color}
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

const HistoricalDataChart: React.FC<HistoricalDataChartProps> = ({ soilData, greenhouseData, theme }) => {
    const formatTime = (isoString: string) => new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const soilChartData = [...soilData].reverse().map(d => ({ ...d, time: formatTime(d.inserted_at) }));
    const greenhouseChartData = [...greenhouseData].reverse().map(d => ({ ...d, time: formatTime(d.timestamp) }));

    const soilCharts = [
        { key: 'moisture', name: 'Soil Moisture', unit: '%', color: '#795548' },
        { key: 'temperature', name: 'Soil Temperature', unit: '°C', color: '#4CAF50' },
        { key: 'ec', name: 'Soil Conductivity', unit: 'uS/cm', color: '#795548' },
        { key: 'ph', name: 'Soil pH Level', unit: '', color: '#4CAF50' },
    ];
    
    const greenhouseCharts = [
        { key: 'temperature', name: 'Greenhouse Temp', unit: '°C', color: '#f97316' },
        { key: 'humidity', name: 'Greenhouse Humidity', unit: '%', color: '#3b82f6' },
        { key: 'pressure', name: 'Air Pressure', unit: 'hPa', color: '#8b5cf6' },
        { key: 'altitude', name: 'Altitude', unit: 'm', color: '#10b981' },
        { key: 'lightRaw', name: 'Light Intensity', unit: 'raw', color: '#f59e0b' },
        { key: 'airQualityRaw', name: 'Air Quality (MQ135)', unit: 'raw', color: '#64748b' },
        { key: 'smokeRaw', name: 'Smoke (MQ2)', unit: 'raw', color: '#ef4444' },
        { key: 'coRaw', name: 'CO (MQ7)', unit: 'raw', color: '#d946ef' },
    ];

  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-800 rounded-lg p-5 col-span-1 lg:col-span-4 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 shadow-sm hover:shadow-md dark:shadow-none">
        <h2 className="text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary mb-6">Historical Trends</h2>
        
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-brand-secondary dark:text-dark-brand-secondary mb-4">Soil Condition Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
                {soilCharts.map(chart => (
                    <TrendChart key={chart.key} title={chart.name} data={soilChartData} dataKey={chart.key} name={chart.name} unit={chart.unit} color={chart.color} theme={theme} />
                ))}
            </div>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold text-brand-secondary dark:text-dark-brand-secondary mb-4">Greenhouse Environment Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
                {greenhouseCharts.map(chart => (
                     <TrendChart key={chart.key} title={chart.name} data={greenhouseChartData} dataKey={chart.key} name={chart.name} unit={chart.unit} color={chart.color} theme={theme} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default HistoricalDataChart;