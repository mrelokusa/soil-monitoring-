import React from 'react';
import { GreenhouseData } from '../types';
import {
  TemperatureIcon,
  HumidityIcon,
  LightIcon,
  PressureIcon,
  AirQualityIcon,
  FireIcon,
  AltitudeIcon,
  SmokeIcon,
  COIcon
} from './Icons';

interface GreenhousePanelProps {
  data?: GreenhouseData;
  error?: string | null;
}

const MiniMetric: React.FC<{ icon: React.ReactNode; label: string; value: string | number; unit: string; }> = ({ icon, label, value, unit }) => (
    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-900/40 p-3 rounded-lg flex-1">
        <div className="text-brand-secondary dark:text-dark-brand-secondary">{icon}</div>
        <div>
            <div className="text-sm text-brand-text-secondary dark:text-dark-brand-text-secondary">{label}</div>
            <div className="text-lg font-bold text-brand-text-primary dark:text-dark-brand-text-primary">{value} <span className="text-sm font-normal">{unit}</span></div>
        </div>
    </div>
);


const GreenhousePanel: React.FC<GreenhousePanelProps> = ({ data, error }) => {

    const getAirQualityStatus = () => {
        if (!data) return { text: 'N/A', color: 'text-brand-text-secondary dark:text-dark-brand-text-secondary' };
        const totalPollutants = data.airQualityRaw + data.smokeRaw + data.coRaw;
        if (totalPollutants > 500) return { text: 'Poor', color: 'text-red-500' };
        if (totalPollutants > 200) return { text: 'Moderate', color: 'text-yellow-500' };
        return { text: 'Good', color: 'text-green-500' };
    };

    const airQuality = getAirQualityStatus();

    return (
        <div className="bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-800 rounded-lg p-5 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 shadow-sm hover:shadow-md dark:shadow-none flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-brand-text-primary dark:text-dark-brand-text-primary">Greenhouse Environment</h2>
                <div className="text-xs font-semibold text-brand-text-secondary dark:text-dark-brand-text-secondary bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full">
                    In collaboration with <span className="font-bold text-brand-secondary dark:text-dark-brand-secondary">Group 9</span>
                </div>
            </div>

            {error && (
                <div className="flex-grow flex items-center justify-center p-4 bg-red-900/50 rounded-lg border border-red-700 text-red-300">
                    <p className="font-bold text-center">Could not load greenhouse data. <br/> <span className="text-sm font-normal">{error}</span></p>
                </div>
            )}

            {data && (
                <div className="flex flex-col gap-4 flex-grow">
                     {data.flameDetected && (
                         <div className="flex items-center gap-4 p-3 rounded-lg bg-red-900/50 border border-red-700 animate-pulse">
                            <FireIcon />
                            <div>
                                <h3 className="text-base font-bold text-red-300">CRITICAL: FLAME DETECTED</h3>
                                <p className="text-red-400 text-sm">Immediate action required.</p>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 flex-grow">
                        <MiniMetric icon={<TemperatureIcon />} label="Air Temp" value={data.temperature.toFixed(1)} unit="°C" />
                        <MiniMetric icon={<HumidityIcon />} label="Humidity" value={data.humidity.toFixed(1)} unit="%" />
                        <MiniMetric icon={<LightIcon />} label="Light" value={data.lightRaw} unit="raw" />
                        <MiniMetric icon={<PressureIcon />} label="Pressure" value={data.pressure.toFixed(1)} unit="hPa" />
                        <MiniMetric icon={<AltitudeIcon />} label="Altitude" value={data.altitude.toFixed(1)} unit="m" />
                        <MiniMetric icon={<SmokeIcon />} label="Smoke (MQ2)" value={data.smokeRaw} unit="raw" />
                        <MiniMetric icon={<COIcon />} label="CO (MQ7)" value={data.coRaw} unit="raw" />
                         <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-900/40 p-3 rounded-lg flex-1">
                            <div className={airQuality.color}><AirQualityIcon /></div>
                            <div>
                                <div className="text-sm text-brand-text-secondary dark:text-dark-brand-text-secondary">Air Quality (MQ135)</div>
                                <div className={`text-lg font-bold ${airQuality.color}`}>{airQuality.text}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GreenhousePanel;