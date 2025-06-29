import React from 'react';

interface SectionBodyProps {
    children: React.ReactNode;
    className?: string;
}

const SectionBody: React.FC<SectionBodyProps> = ({ children, className }) => {
    return (
        <p className={`section-body ${className}`}>
            {children}
        </p>
    );
};

export default SectionBody;
