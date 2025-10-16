import React, { useState, useEffect } from 'react';
import { fetchSoilData } from './services/supabaseService';
import { SoilData } from './types';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import NPKChart from './components/NPKChart';
import Footer from './components/Footer';
import HistoryTable from './components/HistoryTable';
import {
  MoistureIcon,
  TemperatureIcon,
  ECIcon,
  PHIcon,
} from './components/Icons';

const App: React.FC = () => {
  const [data, setData] = useState<SoilData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (loading) { // only set loading on the very first fetch
            setLoading(true);
        }
        const historicalData = await fetchSoilData(20);
        setData(historicalData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
    const intervalId = setInterval(getData, 5000); // Refresh every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const getStatus = () => {
    if (loading && !data) return 'Initializing...';
    if (error) return 'Connection Lost';
    return 'Live';
  };
  
  const latestData = data?.[0];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col">
      <Header status={getStatus()} lastUpdated={latestData?.inserted_at} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading && !data && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        )}
        {error && (
          <div className="text-center p-8 bg-red-900/50 rounded-lg border border-red-700">
            <h2 className="text-2xl font-bold text-red-300">Data Fetching Error</h2>
            <p className="mt-2 text-red-400">{error}</p>
            <p className="mt-4 text-brand-text-secondary">Please check your network connection and the Supabase configuration. The dashboard will attempt to reconnect automatically.</p>
          </div>
        )}
        {latestData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-4">
                <NPKChart data={latestData} />
            </div>
            <MetricCard
              icon={<MoistureIcon />}
              label="Moisture"
              value={latestData.moisture}
              unit="%"
              color="cyan"
            />
            <MetricCard
              icon={<TemperatureIcon />}
              label="Temperature"
              value={latestData.temperature}
              unit="°C"
              color="green"
            />
            <MetricCard
              icon={<ECIcon />}
              label="Conductivity"
              value={latestData.ec}
              unit="uS/cm"
              color="cyan"
            />
            <MetricCard
              icon={<PHIcon />}
              label="pH Level"
              value={latestData.ph}
              unit=""
              color="green"
            />
          </div>
        )}
        {data && data.length > 0 && (
            <HistoryTable data={data} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;