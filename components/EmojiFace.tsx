import React from 'react';
import { Mood } from '../types';

interface EmojiFaceProps {
  mood: Mood;
}

export const EmojiFace: React.FC<EmojiFaceProps> = ({ mood }) => {
  // Base colors
  const skinColor = "#FFD93D";
  const strokeColor = "#5C4033"; // Dark brown for cartoon outline

  return (
    <div className="w-48 h-48 transition-transform duration-300 ease-in-out transform hover:scale-105">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
        {/* Face Shape */}
        <circle cx="100" cy="100" r="90" fill={skinColor} stroke={strokeColor} strokeWidth="4" />
        
        {/* Cheeks (visible when happy or sad for cuteness) */}
        <circle cx="45" cy="110" r="12" fill="#FF9999" opacity="0.6" />
        <circle cx="155" cy="110" r="12" fill="#FF9999" opacity="0.6" />

        {/* Eyes */}
        <g className="transition-all duration-300">
          {mood === 'happy' && (
            <>
              {/* Happy Eyes: Inverted Arcs */}
              <path d="M40 80 Q60 60 80 80" fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
              <path d="M120 80 Q140 60 160 80" fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            </>
          )}

          {mood === 'sad' && (
            <>
              {/* Sad Eyes: Large watery circles with highlights */}
              <circle cx="60" cy="85" r="15" fill={strokeColor} />
              <circle cx="140" cy="85" r="15" fill={strokeColor} />
              {/* Tears highlights */}
              <circle cx="65" cy="80" r="5" fill="white" />
              <circle cx="145" cy="80" r="5" fill="white" />
              {/* Eyebrows slanting down */}
              <path d="M45 60 L75 70" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
              <path d="M155 60 L125 70" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            </>
          )}

          {mood === 'neutral' && (
            <>
              {/* Neutral Eyes: Simple dots */}
              <ellipse cx="60" cy="80" rx="10" ry="12" fill={strokeColor} />
              <ellipse cx="140" cy="80" rx="10" ry="12" fill={strokeColor} />
            </>
          )}
        </g>

        {/* Mouth */}
        <g className="transition-all duration-300">
          {mood === 'happy' && (
            /* Big Smile */
            <path d="M50 120 Q100 170 150 120 Z" fill="#FFFFFF" stroke={strokeColor} strokeWidth="4" />
          )}

          {mood === 'sad' && (
            /* Wavy sad mouth */
             <path d="M70 140 Q100 130 130 140" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          )}

          {mood === 'neutral' && (
            /* Simple line */
            <path d="M70 130 Q100 140 130 130" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          )}
        </g>
      </svg>
    </div>
  );
};