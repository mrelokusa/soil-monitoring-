import React from 'react';
import { SoilData, GreenhouseData } from '../types';
import MetricCard from './MetricCard';
import NPKChart from './NPKChart';
import HistoryTable from './HistoryTable';
import HistoricalDataChart from './HistoricalDataChart';
import AIAnalysis from './AIAnalysis';
import GreenhousePanel from './GreenhousePanel';
import EmailSubscription from './EmailSubscription';
import RefreshControl from './RefreshControl';
import {
  MoistureIcon,
  TemperatureIcon,
  ECIcon,
  PHIcon,
  NitrogenIcon,
  PhosphorusIcon,
  PotassiumIcon,
} from './Icons';

interface DashboardProps {
    soilData: SoilData[] | null;
    greenhouseData: GreenhouseData[] | null;
    loading: boolean;
    soilError: string | null;
    greenhouseError: string | null;
    userEmail: string | null;
    onSetEmail: (email: string) => void;
    theme: 'light' | 'dark';
    isAutoRefreshEnabled: boolean;
    onToggleAutoRefresh: (isEnabled: boolean) => void;
    autoRefreshInterval: number;
    onIntervalChange: (interval: number) => void;
    onManualRefresh: () => void;
    isInitialLoad: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
    soilData,
    greenhouseData,
    loading,
    soilError,
    greenhouseError,
    userEmail,
    onSetEmail,
    theme,
    isAutoRefreshEnabled,
    onToggleAutoRefresh,
    autoRefreshInterval,
    onIntervalChange,
    onManualRefresh,
    isInitialLoad
}) => {
    
    const latestSoilData = soilData?.[0];
    const latestGreenhouseData = greenhouseData?.[0];
    
    return (
        <>
            <RefreshControl 
                isAutoRefreshEnabled={isAutoRefreshEnabled}
                onToggleAutoRefresh={onToggleAutoRefresh}
                currentInterval={autoRefreshInterval}
                onIntervalChange={onIntervalChange}
                onManualRefresh={onManualRefresh}
                isLoading={loading && (isInitialLoad || !soilData)}
            />

            {loading && !soilData && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary dark:border-dark-brand-primary"></div>
              </div>
            )}
            {!loading && !soilData && soilError && (
              <div className="text-center p-8 bg-red-900/50 rounded-lg border border-red-700">
                <h2 className="text-2xl font-bold text-red-300">Dashboard Critical Error</h2>
                <p className="mt-2 text-red-400">{soilError}</p>
                <p className="mt-4 text-brand-text-secondary dark:text-dark-brand-text-secondary">Could not load primary soil data. The dashboard will attempt to reconnect automatically.</p>
              </div>
            )}
            
            {soilData && (
                <div className="space-y-8 animate-fade-in">
                    {/* Section 1: Live Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <MetricCard
                              icon={<MoistureIcon />}
                              label="Soil Moisture"
                              value={latestSoilData?.moisture ?? '...'}
                              unit="%"
                              color="secondary"
                            />
                            <MetricCard
                              icon={<TemperatureIcon />}
                              label="Soil Temperature"
                              value={latestSoilData?.temperature ?? '...'}
                              unit="°C"
                              color="primary"
                            />
                            <MetricCard
                              icon={<ECIcon />}
                              label="Soil Conductivity"
                              value={latestSoilData?.ec ?? '...'}
                              unit="uS/cm"
                              color="secondary"
                            />
                            <MetricCard
                              icon={<PHIcon />}
                              label="Soil pH Level"
                              value={latestSoilData?.ph ?? '...'}
                              unit=""
                              color="primary"
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <GreenhousePanel data={latestGreenhouseData} error={greenhouseError} />
                        </div>
                    </div>
                    
                    {/* Section 2: Analysis & Nutrients */}
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                        <div className="xl:col-span-3 space-y-8">
                            <EmailSubscription userEmail={userEmail} onSetEmail={onSetEmail} />
                            <AIAnalysis latestSoilData={latestSoilData} latestGreenhouseData={latestGreenhouseData} userEmail={userEmail} />
                        </div>
                        <div className="xl:col-span-2 space-y-6">
                            {latestSoilData && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <MetricCard icon={<NitrogenIcon />} label="Nitrogen" value={latestSoilData.nitrogen} unit="mg/kg" color="primary" />
                                        <MetricCard icon={<PhosphorusIcon />} label="Phosphorus" value={latestSoilData.phosphorus} unit="mg/kg" color="secondary" />
                                        <MetricCard icon={<PotassiumIcon />} label="Potassium" value={latestSoilData.potassium} unit="mg/kg" color="primary" />
                                    </div>
                                    <NPKChart data={latestSoilData} theme={theme} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Historical Data */}
                     {soilData && soilData.length > 1 && greenhouseData && greenhouseData.length > 1 && (
                        <HistoricalDataChart soilData={soilData} greenhouseData={greenhouseData} theme={theme} />
                    )}

                    {soilData && soilData.length > 0 && (
                        <HistoryTable data={soilData} />
                    )}
                </div>
            )}
        </>
    );
};

export default Dashboard;
