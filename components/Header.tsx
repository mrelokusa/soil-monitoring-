import React from 'react';
import { SunIcon, MoonIcon, BookOpenIcon, LayoutDashboardIcon } from './Icons';
import { Page } from '../App';

type Theme = 'light' | 'dark';

interface ThemeSwitcherProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-brand-surface dark:bg-dark-brand-surface border border-gray-200 dark:border-gray-700 text-brand-text-secondary dark:text-dark-brand-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
    >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
);


interface HeaderProps {
    status: string;
    lastUpdated?: string;
    theme: Theme;
    toggleTheme: () => void;
    navigate: (page: Page) => void;
    currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ status, lastUpdated, theme, toggleTheme, navigate, currentPage }) => {
    const isLive = status === 'Live';

    const formatDateTime = (isoString?: string) => {
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
    }

    const NavLink: React.FC<{ page: Page; icon: React.ReactNode; children: React.ReactNode }> = ({ page, icon, children }) => {
        const isActive = currentPage === page;
        return (
            <button 
                onClick={() => navigate(page)} 
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-brand-primary/10 text-brand-primary dark:bg-dark-brand-primary/20 dark:text-dark-brand-primary' : 'text-brand-text-secondary hover:bg-gray-200/50 dark:text-dark-brand-text-secondary dark:hover:bg-gray-800/50'}`}
            >
                {icon}
                {children}
            </button>
        );
    };

    return (
        <header className="bg-brand-surface/80 dark:bg-dark-brand-surface/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('dashboard')} className="flex items-center gap-3 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary dark:text-dark-brand-primary group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.512 5.73 6.512 5.73c.27-.198.585-.346.919-.452.334-.107.682-.162 1.036-.162.354 0 .702.055 1.036.162.334.106.65.254.919.452 0 0 .001 0 .001.001.27.198.515.423.728.678.213.254.394.531.541.829.147.298.256.623.328.966.072.343.109.704.109 1.079 0 .375-.037.736-.109 1.079-.072.343-.181.668-.328.966-.147.298-.328.575-.541.829-.213.254-.458.48-.728.678a4.475 4.475 0 01-1.955-.856c-.334.106-.682.162-1.036.162-.354 0-.702-.055-1.036-.162a4.475 4.475 0 01-1.955-.856 4.51 4.51 0 01-1.269-1.507.5.5 0 01.65-.65c.175.175.363.336.566.479a3.475 3.475 0 001.52.66c.29.092.597.138.911.138.314 0 .622-.046.911-.138a3.475 3.475 0 001.52-.66c.203-.143.391-.304.566-.479.175-.175.33-.362.464-.559.135-.198.248-.413.338-.645.09-.232.158-.48.204-.744.046-.264.069-.538.069-.821 0-.283-.023-.557-.069-.821-.046-.264-.114-.512-.204-.744a3.532 3.532 0 00-.802-1.204c-.175-.175-.363-.336-.566-.479a3.475 3.475 0 00-1.52-.66c-.29-.092-.597-.138-.911-.138-.314 0-.622-.046-.911-.138a3.475 3.475 0 00-1.52-.66c-.203-.143-.391-.304-.566-.479-.175-.175-.33-.362-.464-.559a3.536 3.536 0 01-.541-1.854c.001-.129.011-.257.03-.383.019-.126.048-.25.087-.371z" clipRule="evenodd" />
                        </svg>
                        <h1 className="hidden md:block text-xl font-bold tracking-tight text-brand-text-primary dark:text-dark-brand-text-primary">ARC Smart Agriculture</h1>
                    </button>
                </div>
                
                <nav className="flex items-center gap-2">
                    <NavLink page="dashboard" icon={<LayoutDashboardIcon />}><span className="hidden sm:inline">Dashboard</span></NavLink>
                    <NavLink page="documentation" icon={<BookOpenIcon />}><span className="hidden sm:inline">Documentation</span></NavLink>
                </nav>

                <div className="flex items-center gap-4 text-sm">
                   <div className="hidden lg:flex items-center gap-2">
                       <span className={`relative flex h-3 w-3`}>
                           <span className={`absolute inline-flex h-full w-full rounded-full ${isLive ? 'bg-green-400 animate-ping' : 'bg-red-500'} opacity-75`}></span>
                           <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-green-500' : 'bg-red-600'}`}></span>
                       </span>
                       <span className={`font-semibold ${isLive ? 'text-green-500' : 'text-red-500'}`}>{status}</span>
                   </div>
                   <div className="hidden xl:block h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                   <div className="hidden xl:flex items-center gap-2 text-brand-text-secondary dark:text-dark-brand-text-secondary">
                        <span className="font-medium">Last Reading:</span>
                        <span>{formatDateTime(lastUpdated)}</span>
                   </div>
                   <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </header>
    );
};

export default Header;