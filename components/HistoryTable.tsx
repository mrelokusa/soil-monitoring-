import React from 'react';
import { SoilData } from '../types';

interface HistoryTableProps {
    data: SoilData[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
    const formatTimestamp = (isoString: string) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };
    
    return (
        <div className="bg-brand-surface border border-gray-800 rounded-lg p-5 transition-all duration-300 hover:border-gray-700 shadow-lg">
            <h2 className="text-xl font-bold text-brand-text-primary mb-4">Readings History</h2>
            <div className="overflow-x-auto relative max-h-96">
                <table className="w-full text-left text-sm text-brand-text-secondary">
                    <thead className="bg-brand-surface text-xs uppercase sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3 text-center">Moisture (%)</th>
                            <th scope="col" className="px-6 py-3 text-center">Temp (°C)</th>
                            <th scope="col" className="px-6 py-3 text-center">EC (uS/cm)</th>
                            <th scope="col" className="px-6 py-3 text-center">pH</th>
                            <th scope="col" className="px-6 py-3 text-center">N (mg/kg)</th>
                            <th scope="col" className="px-6 py-3 text-center">P (mg/kg)</th>
                            <th scope="col" className="px-6 py-3 text-center">K (mg/kg)</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-800'>
                        {data.map((reading) => (
                            <tr key={reading.id} className="hover:bg-gray-900/30">
                                <th scope="row" className="px-6 py-4 font-medium text-brand-text-primary whitespace-nowrap">
                                    {formatTimestamp(reading.inserted_at)}
                                </th>
                                <td className="px-6 py-4 text-center">{reading.moisture.toFixed(1)}</td>
                                <td className="px-6 py-4 text-center">{reading.temperature.toFixed(1)}</td>
                                <td className="px-6 py-4 text-center">{reading.ec}</td>
                                <td className="px-6 py-4 text-center">{reading.ph.toFixed(1)}</td>
                                <td className="px-6 py-4 text-center">{reading.nitrogen}</td>
                                <td className="px-6 py-4 text-center">{reading.phosphorus}</td>
                                <td className="px-6 py-4 text-center">{reading.potassium}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
