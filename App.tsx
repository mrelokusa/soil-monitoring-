import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchSoilData } from './services/supabaseService';
import { fetchGreenhouseData } from './services/greenhouseService';
import { SoilData, GreenhouseData } from './types';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import NPKChart from './components/NPKChart';
import Footer from './components/Footer';
import HistoryTable from './components/HistoryTable';
import HistoricalDataChart from './components/HistoricalDataChart';
import AIAnalysis from './components/AIAnalysis';
import GreenhousePanel from './components/GreenhousePanel';
import EmailSubscription from './components/EmailSubscription';
import RefreshControl from './components/RefreshControl';
import {
  MoistureIcon,
  TemperatureIcon,
  ECIcon,
  PHIcon,
  NitrogenIcon,
  PhosphorusIcon,
  PotassiumIcon,
} from './components/Icons';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData[] | null>(null);
  const [greenhouseData, setGreenhouseData] = useState<GreenhouseData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [soilError, setSoilError] = useState<string | null>(null);
  const [greenhouseError, setGreenhouseError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (storedTheme) return storedTheme;
      if (userMedia.matches) return 'dark';
    }
    return 'light';
  });

  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('isAutoRefreshEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('autoRefreshInterval');
        return saved !== null ? JSON.parse(saved) : 900000; // 15 minutes default
    }
    return 900000;
  });

  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedEmail = window.localStorage.getItem('userEmail');
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, []);

  const handleSetEmail = (email: string) => {
    setUserEmail(email);
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('userEmail', email);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Persist refresh settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isAutoRefreshEnabled', JSON.stringify(isAutoRefreshEnabled));
      localStorage.setItem('autoRefreshInterval', JSON.stringify(autoRefreshInterval));
    }
  }, [isAutoRefreshEnabled, autoRefreshInterval]);

  const getData = useCallback(async (isManualRefresh = false) => {
    // Show full page loader only on initial load or manual refresh
    if (isManualRefresh || isInitialLoad.current) {
      setLoading(true);
    }

    try {
      const historicalSoilData = await fetchSoilData();
      setSoilData(historicalSoilData);
      setSoilError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setSoilError(errorMessage);
      console.error("Soil data error:", err);
    } 
    
    try {
      const historicalGreenhouseData = await fetchGreenhouseData();
      setGreenhouseData(historicalGreenhouseData);
      setGreenhouseError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setGreenhouseError(errorMessage);
      console.error("Greenhouse data error:", err);
    }
    
    if (isInitialLoad.current) {
        isInitialLoad.current = false;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getData(false); // Initial fetch

    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (isAutoRefreshEnabled) {
      // Subsequent auto-refreshes will not trigger the full-page loader.
      intervalId = setInterval(() => getData(false), autoRefreshInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoRefreshEnabled, autoRefreshInterval, getData]);

  const getStatus = () => {
    if (loading && isInitialLoad.current) return 'Initializing...';
    if (soilError || greenhouseError) return 'Connection Lost';
    return 'Live';
  };
  
  const latestSoilData = soilData?.[0];
  const latestGreenhouseData = greenhouseData?.[0];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary dark:bg-dark-brand-bg dark:text-dark-brand-text-primary flex flex-col">
      <Header status={getStatus()} lastUpdated={latestSoilData?.inserted_at} theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        
        <RefreshControl 
            isAutoRefreshEnabled={isAutoRefreshEnabled}
            onToggleAutoRefresh={setIsAutoRefreshEnabled}
            currentInterval={autoRefreshInterval}
            onIntervalChange={setAutoRefreshInterval}
            onManualRefresh={() => getData(true)}
            isLoading={loading && (isInitialLoad.current || !soilData)}
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
                        <EmailSubscription userEmail={userEmail} onSetEmail={handleSetEmail} />
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
      </main>
      <Footer />
    </div>
  );
};

export default App;