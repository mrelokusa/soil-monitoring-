import React, { useState, useCallback } from 'react';
import { getCombinedAnalysis } from '../services/geminiService';
import { sendAlertToWebhook } from '../services/webhookService';
import { SoilData, GreenhouseData, AIAnalysisResponse } from '../types';
import { SparklesIcon, RefreshIcon } from './Icons';

interface AIAnalysisProps {
  latestSoilData?: SoilData;
  latestGreenhouseData?: GreenhouseData;
  userEmail: string | null;
}

const AISkeletonLoader: React.FC = () => (
    <div className="space-y-4">
        <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse-bg"></div>
        <div className="space-y-2">
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse-bg"></div>
            <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse-bg"></div>
        </div>
        <div className="space-y-2 pt-2">
            <div className="w-1/4 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse-bg mb-2"></div>
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse-bg"></div>
        </div>
    </div>
)

const AIAnalysis: React.FC<AIAnalysisProps> = ({ latestSoilData, latestGreenhouseData, userEmail }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!latestSoilData || !latestGreenhouseData) {
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await getCombinedAnalysis(latestSoilData, latestGreenhouseData);
      setAnalysis(result);
      // Send the result to the webhook for alerting
      await sendAlertToWebhook(result, userEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [latestSoilData, latestGreenhouseData, userEmail]);

  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-800 rounded-lg p-5 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 shadow-sm hover:shadow-md dark:shadow-none">
      <div className="flex justify-between items-center gap-3 mb-4">
        <div className="flex items-center gap-3 text-brand-primary dark:text-dark-brand-primary">
            <SparklesIcon />
            <h2 className="text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary">AI Environmental Analyst</h2>
        </div>
        <button 
            onClick={handleAnalysis} 
            disabled={loading || !latestSoilData || !latestGreenhouseData}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-secondary dark:text-dark-brand-secondary bg-brand-surface dark:bg-dark-brand-surface border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Refresh AI Analysis"
        >
            <RefreshIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analyzing...' : 'Refresh Now'}
        </button>
      </div>

      <div className="min-h-[200px] p-2">
        {!analysis && !loading && !error && (
             <div className="flex flex-col items-center justify-center h-full text-center text-brand-text-secondary dark:text-dark-brand-text-secondary p-4">
                <p>
                    {latestSoilData && latestGreenhouseData ? 'Click "Refresh Now" to generate an AI analysis.' : 'Waiting for sensor data to begin analysis...'}
                </p>
            </div>
        )}
        {loading && <AISkeletonLoader />}
        {error && !loading && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-4 text-red-300">
                <h3 className="font-bold">Analysis Failed</h3>
                <p className="text-sm mt-1">{error}</p>
            </div>
        )}
        {analysis && !loading && (
            <div className="space-y-4 text-brand-text-secondary dark:text-dark-brand-text-secondary">
                <div>
                    <h3 className="font-semibold text-brand-primary dark:text-dark-brand-primary mb-2 text-base">Overall Summary</h3>
                    <p className="text-brand-text-primary dark:text-dark-brand-text-primary bg-gray-100 dark:bg-gray-900/30 p-3 rounded-md text-sm">{analysis.overall_summary}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <h3 className="font-semibold text-brand-secondary dark:text-dark-brand-secondary mb-2">Key Observations</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            {analysis.observations.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-brand-primary dark:text-dark-brand-primary mb-2">Recommendations</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            {analysis.recommendations.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                </div>

                {analysis.cross_domain_insights && analysis.cross_domain_insights.length > 0 && (
                     <div>
                        <h3 className="font-semibold text-brand-secondary dark:text-dark-brand-secondary mb-2">Integrated Insights</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            {analysis.cross_domain_insights.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;