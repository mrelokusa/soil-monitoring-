
import React from 'react';

interface HeaderProps {
    status: string;
    lastUpdated?: string;
}

const Header: React.FC<HeaderProps> = ({ status, lastUpdated }) => {
    const isLive = status === 'Live';

    const formatTime = (isoString?: string) => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleTimeString();
        } catch (e) {
            return 'Invalid Date';
        }
    }

    return (
        <header className="bg-brand-surface/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.512 5.73 6.512 5.73c.27-.198.585-.346.919-.452.334-.107.682-.162 1.036-.162.354 0 .702.055 1.036.162.334.106.65.254.919.452 0 0 .001 0 .001.001.27.198.515.423.728.678.213.254.394.531.541.829.147.298.256.623.328.966.072.343.109.704.109 1.079 0 .375-.037.736-.109 1.079-.072.343-.181.668-.328.966-.147.298-.328.575-.541.829-.213.254-.458.48-.728.678a4.475 4.475 0 01-1.955.856c-.334.106-.682.162-1.036.162-.354 0-.702-.055-1.036-.162a4.475 4.475 0 01-1.955-.856 4.51 4.51 0 01-1.269-1.507.5.5 0 01.65-.65c.175.175.363.336.566.479a3.475 3.475 0 001.52.66c.29.092.597.138.911.138.314 0 .622-.046.911-.138a3.475 3.475 0 001.52-.66c.203-.143.391-.304.566-.479.175-.175.33-.362.464-.559.135-.198.248-.413.338-.645.09-.232.158-.48.204-.744.046-.264.069-.538.069-.821 0-.283-.023-.557-.069-.821-.046-.264-.114-.512-.204-.744a3.532 3.532 0 00-.802-1.204c-.175-.175-.363-.336-.566-.479a3.475 3.475 0 00-1.52-.66c-.29-.092-.597-.138-.911-.138-.314 0-.622-.046-.911-.138a3.475 3.475 0 00-1.52-.66c-.203-.143-.391-.304-.566-.479-.175-.175-.33-.362-.464-.559a3.536 3.536 0 01-.541-1.854c.001-.129.011-.257.03-.383.019-.126.048-.25.087-.371z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-xl font-bold tracking-tight text-brand-text-primary">ARC Smart Agriculture</h1>
                </div>
                <div className="flex items-center gap-4 text-sm">
                   <div className="flex items-center gap-2">
                       <span className={`relative flex h-3 w-3`}>
                           <span className={`absolute inline-flex h-full w-full rounded-full ${isLive ? 'bg-green-400 animate-ping' : 'bg-red-500'} opacity-75`}></span>
                           <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-green-500' : 'bg-red-600'}`}></span>
                       </span>
                       <span className={`font-semibold ${isLive ? 'text-green-400' : 'text-red-400'}`}>{status}</span>
                   </div>
                   <div className="hidden sm:block h-6 w-px bg-gray-700"></div>
                   <div className="hidden sm:flex items-center gap-2 text-brand-text-secondary">
                        <span className="font-medium">Last Reading:</span>
                        <span>{formatTime(lastUpdated)}</span>
                   </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
