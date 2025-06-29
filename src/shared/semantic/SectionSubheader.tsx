import React from 'react';

interface SectionSubheaderProps {
    children: React.ReactNode;
    className?: string;
}

const SectionSubheader: React.FC<SectionSubheaderProps> = ({ children, className }) => {
    return (
        <p className={`section-subheader ${className}`}>
            {children}
        </p>
    );
};

export default SectionSubheader;
