import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchSoilData } from './services/supabaseService';
import { fetchGreenhouseData } from './services/greenhouseService';
import { SoilData, GreenhouseData } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Documentation from './components/Documentation';

type Theme = 'light' | 'dark';
export type Page = 'dashboard' | 'documentation';


const App: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData[] | null>(null);
  const [greenhouseData, setGreenhouseData] = useState<GreenhouseData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [soilError, setSoilError] = useState<string | null>(null);
  const [greenhouseError, setGreenhouseError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [page, setPage] = useState<Page>('dashboard');

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

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary dark:bg-dark-brand-bg dark:text-dark-brand-text-primary flex flex-col">
      <Header 
        status={getStatus()} 
        lastUpdated={latestSoilData?.inserted_at} 
        theme={theme} 
        toggleTheme={toggleTheme}
        navigate={setPage}
        currentPage={page}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {page === 'dashboard' && (
            <Dashboard
                soilData={soilData}
                greenhouseData={greenhouseData}
                loading={loading}
                soilError={soilError}
                greenhouseError={greenhouseError}
                userEmail={userEmail}
                onSetEmail={handleSetEmail}
                theme={theme}
                isAutoRefreshEnabled={isAutoRefreshEnabled}
                onToggleAutoRefresh={setIsAutoRefreshEnabled}
                autoRefreshInterval={autoRefreshInterval}
                onIntervalChange={setAutoRefreshInterval}
                onManualRefresh={() => getData(true)}
                isInitialLoad={isInitialLoad.current}
            />
        )}
        {page === 'documentation' && <Documentation />}
      </main>

      <Footer />
    </div>
  );
};

export default App;