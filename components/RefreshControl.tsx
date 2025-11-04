import React from 'react';
import { RefreshIcon } from './Icons';

interface RefreshControlProps {
    isAutoRefreshEnabled: boolean;
    onToggleAutoRefresh: (isEnabled: boolean) => void;
    currentInterval: number;
    onIntervalChange: (interval: number) => void;
    onManualRefresh: () => void;
    isLoading: boolean;
}

const REFRESH_OPTIONS = [
    { label: '10 seconds', value: 10000 },
    { label: '30 seconds', value: 30000 },
    { label: '1 minute', value: 60000 },
    { label: '5 minutes', value: 300000 },
    { label: '15 minutes', value: 900000 },
];

const RefreshControl: React.FC<RefreshControlProps> = ({
    isAutoRefreshEnabled,
    onToggleAutoRefresh,
    currentInterval,
    onIntervalChange,
    onManualRefresh,
    isLoading
}) => {
    return (
        <div className="mb-6 bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
                onClick={onManualRefresh}
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-primary dark:bg-dark-brand-primary dark:text-dark-brand-bg rounded-md hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                aria-label="Refresh data now"
            >
                <RefreshIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh Now'}
            </button>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="auto-refresh-toggle" className="text-sm font-medium text-brand-text-secondary dark:text-dark-brand-text-secondary cursor-pointer">
                        Auto-Refresh
                    </label>
                    <button
                        id="auto-refresh-toggle"
                        role="switch"
                        aria-checked={isAutoRefreshEnabled}
                        onClick={() => onToggleAutoRefresh(!isAutoRefreshEnabled)}
                        className={`${isAutoRefreshEnabled ? 'bg-brand-primary dark:bg-dark-brand-primary' : 'bg-gray-300 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-dark-brand-surface`}
                    >
                        <span className={`${isAutoRefreshEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                    </button>
                </div>
                {isAutoRefreshEnabled && (
                     <select
                        value={currentInterval}
                        onChange={(e) => onIntervalChange(Number(e.target.value))}
                        className="text-sm px-3 py-1.5 bg-brand-surface dark:bg-dark-brand-surface border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-brand-primary"
                        aria-label="Select refresh interval"
                     >
                        {REFRESH_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default RefreshControl;
