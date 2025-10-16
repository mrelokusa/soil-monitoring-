import React from 'react';

const iconProps = {
    className: 'h-6 w-6',
    strokeWidth: 1.5,
    stroke: 'currentColor',
    fill: 'none',
    viewBox: '0 0 24 24',
};

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