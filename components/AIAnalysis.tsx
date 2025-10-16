import React, { useState } from 'react';
import { getSoilAnalysis } from '../services/geminiService';
import { SoilData, AIAnalysisResponse } from '../types';
import { SparklesIcon } from './Icons';

interface AIAnalysisProps {
  latestData: SoilData;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ latestData }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await getSoilAnalysis(latestData);
      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while generating the analysis.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-surface border border-gray-800 rounded-lg p-5 transition-all duration-300 hover:border-gray-700 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
            <SparklesIcon />
            <h2 className="text-xl font-bold text-brand-text-primary">AI Soil Analyst</h2>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-brand-primary/80 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-primary transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            analysis ? 'Re-analyze Current Data' : 'Analyze Soil Health'
          )}
        </button>
      </div>

      <div className="min-h-[150px]">
        {!analysis && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full text-center text-brand-text-secondary p-4">
                <p>Click the button to get an AI-powered analysis of the latest soil data.</p>
                <p className="text-xs mt-2">Gemini will provide insights and recommendations.</p>
            </div>
        )}
        {loading && (
             <div className="flex items-center justify-center h-full text-brand-text-secondary">
                <p>Contacting agricultural expert... please wait.</p>
            </div>
        )}
        {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-4 text-red-300">
                <h3 className="font-bold">Analysis Failed</h3>
                <p className="text-sm mt-1">{error}</p>
            </div>
        )}
        {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-brand-text-secondary">
                <div className="md:col-span-3">
                    <h3 className="font-semibold text-brand-primary mb-2">Overall Summary</h3>
                    <p className="text-brand-text-primary bg-gray-900/30 p-3 rounded-md">{analysis.overall_summary}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-secondary mb-2">Key Observations</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {analysis.observations.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-semibold text-brand-primary mb-2">Recommendations</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {analysis.recommendations.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
