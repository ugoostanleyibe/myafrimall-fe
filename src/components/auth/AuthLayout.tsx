'use client';

import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  heading: string;
  subheading: string;
}

export const AuthLayout = ({ children, heading, subheading }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 md:px-16 lg:px-24">
        {children}
      </div>

      {/* Right side - Decorative */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-primary md:flex">
        {/* World map dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <WorldMapDots />
        </div>
        <div className="relative z-10 max-w-lg px-12">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            {heading}
          </h2>
          <p className="text-lg text-white/80">
            {subheading}
          </p>
        </div>
      </div>
    </div>
  );
};

function WorldMapDots() {
  // Generate a grid of dots that roughly form a world map silhouette
  const rows = 30;
  const cols = 40;
  const dots: { x: number; y: number; opacity: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Create a pattern that vaguely resembles continents
      const nx = c / cols;
      const ny = r / rows;
      let show = false;

      // Africa region
      if (nx > 0.4 && nx < 0.6 && ny > 0.3 && ny < 0.8) show = true;
      // Europe region
      if (nx > 0.35 && nx < 0.6 && ny > 0.1 && ny < 0.35) show = true;
      // Asia region
      if (nx > 0.55 && nx < 0.9 && ny > 0.1 && ny < 0.5) show = true;
      // Americas
      if (nx > 0.05 && nx < 0.35 && ny > 0.1 && ny < 0.8) show = true;
      // Australia
      if (nx > 0.75 && nx < 0.9 && ny > 0.6 && ny < 0.8) show = true;

      // Add some randomness
      if (show || Math.random() > 0.7) {
        dots.push({
          x: (c / cols) * 100,
          y: (r / rows) * 100,
          opacity: show ? 0.4 + Math.random() * 0.4 : 0.1 + Math.random() * 0.15
        });
      }
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r="0.4"
          fill="white"
          opacity={dot.opacity}
        />
      ))}
    </svg>
  );
}
