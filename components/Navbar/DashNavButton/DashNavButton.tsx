'use client'
import React, { ReactNode, CSSProperties } from 'react';

interface DashNavButtonProps {
    onClick: () => void;
    className?: string;
    children: ReactNode;
    icon?: ReactNode;
    isAbsolute?: boolean;
    position?: CSSProperties;
}

const DashNavButton: React.FC<DashNavButtonProps> = ({ onClick, className, children, icon, isAbsolute, position }) => {
    const buttonStyle: CSSProperties = isAbsolute
        ? {
                position: 'absolute',
                ...position,
            }
        : {};

    return (
        <button onClick={onClick} className={`btn glass ${className}`} style={buttonStyle}>
            {icon && icon}
            {children}
        </button>
    );
};

export default DashNavButton;
