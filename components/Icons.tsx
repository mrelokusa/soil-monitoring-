import React from 'react';

const iconProps = {
    className: 'h-6 w-6',
    strokeWidth: 1.5,
    stroke: 'currentColor',
    fill: 'none',
    viewBox: '0 0 24 24',
};

export const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
  
export const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || 'h-6 w-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0119.5 19.5M20 20l-1.5-1.5A9 9 0 004.5 4.5" />
    </svg>
);


export const HumidityIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.424 2.031-1.087C9.662 8.358 10 7.224 10 6c0-1.224-.338-2.358-.836-3.413A4.992 4.992 0 006.633 1.5c-1.224 0-2.358.338-3.413.836A4.992 4.992 0 001.5 6c0 1.224.338 2.358.836 3.413.498.663 1.225 1.087 2.031 1.087z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.424 2.031-1.087.498-.663.836-1.789.836-2.913 0-1.224-.338-2.358-.836-3.413C8.166 2.424 7.44 2 6.633 2c-.806 0-1.533.424-2.031 1.087-.498.663-.836 1.789-.836 2.913 0 1.224.338 2.358.836 3.413.498.663 1.225 1.087 2.031 1.087zM17.367 10.5c.806 0 1.533-.424 2.031-1.087.498-.663.836-1.789.836-2.913 0-1.224-.338-2.358-.836-3.413C18.9 2.424 18.173 2 17.367 2c-.806 0-1.533.424-2.031 1.087-.498.663-.836 1.789-.836 2.913 0 1.224.338 2.358.836 3.413.498.663 1.225 1.087 2.031 1.087zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

export const LightIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const AirQualityIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const PressureIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.632 0 4.5 4.5 0 01-1.41 8.775" />
    </svg>
);

export const FireIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l.002-.001-.004-.001.01-.004.012-.004-Рис-128a.042.012h.001M15.362 5.214l-2.61-3.14M9.362 5.214l2.61-3.14" />
    </svg>
);

export const SparklesIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 15.75l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 20l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 23.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 20l1.035-.259a3.375 3.375 0 002.456-2.456L18 15.75z" />
    </svg>
);


export const MoistureIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21.75l-4.25-4.25a7.5 7.5 0 1110.606 0L12 21.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75l.007-.007.007.007-.007.007-.007-.007z" />
    </svg>
);

export const TemperatureIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V3m0 18v-3.75m0-12a3 3 0 013 3v6a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-6a3 3 0 013-3H12z" />
    </svg>
);

export const ECIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

export const PHIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const NitrogenIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l.002-.001-.004-.001.01-.004.012-.004-Рис-128a.042.012h.001M15.362 5.214l-2.61-3.14M9.362 5.214l2.61-3.14" />
    </svg>
);

export const PhosphorusIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.25h9" />
    </svg>
);

export const PotassiumIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75l7.5-7.5 7.5 7.5" />
    </svg>
);

export const AltitudeIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 14l4-4 4 4 8-8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
    </svg>
);

export const SmokeIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 21c0-4 3-6 6-6s6 2 6 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 16c0-4 3-6 6-6s6 2 6 6" />
    </svg>
);

export const COIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 12a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);