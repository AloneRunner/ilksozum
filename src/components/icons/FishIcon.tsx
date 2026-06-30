import React from 'react';

interface FishIconProps {
    color?: string;
    className?: string;
    size?: number;
}

const FishIcon: React.FC<FishIconProps> = ({ color = 'currentColor', className = '', size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20.5 12C20.5 15.5 17.5 19 12 19C7.5 19 4.5 16 4.5 12C4.5 8 7.5 5 12 5C17.5 5 20.5 8.5 20.5 12Z"
                fill={color}
            />
            <path
                d="M4.5 12L2 9V15L4.5 12Z"
                fill={color}
            />
            <path
                d="M13 15C14 15 15 14.5 15 14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="15.5" cy="9.5" r="1.5" fill="white" />
            <circle cx="16" cy="9.5" r="0.5" fill="black" />
        </svg>
    );
};

export default FishIcon;
