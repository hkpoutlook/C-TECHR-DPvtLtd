LALANCH URLimport React from 'react';

function Logo({ width = 50, height = 50 }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Shadow filter for 3D effect */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="3" dy="3" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Gradient for depth */}
        <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5B8DEE', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4169E1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Outer blue circle ring */}
      <circle 
        cx="100" 
        cy="100" 
        r="85" 
        fill="none" 
        stroke="#4169E1" 
        strokeWidth="30"
      />
      
      {/* Inner white circle background */}
      <circle 
        cx="100" 
        cy="100" 
        r="70" 
        fill="white"
      />
      
      {/* Letter T with 3D effect */}
      <g filter="url(#shadow)">
        {/* Top horizontal bar of T */}
        <rect 
          x="55" 
          y="55" 
          width="90" 
          height="22" 
          rx="3"
          fill="url(#tGradient)"
        />
        
        {/* Vertical bar of T */}
        <rect 
          x="82" 
          y="55" 
          width="36" 
          height="90" 
          rx="3"
          fill="url(#tGradient)"
        />
        
        {/* Inner shadow for depth on T */}
        <rect 
          x="85" 
          y="58" 
          width="30" 
          height="84" 
          rx="2"
          fill="white"
          opacity="0.15"
        />
      </g>
      
      {/* Bottom shadow under the circle */}
      <ellipse 
        cx="100" 
        cy="185" 
        rx="60" 
        ry="8" 
        fill="black" 
        opacity="0.2"
      />
    </svg>
  );
}

export default Logo;
