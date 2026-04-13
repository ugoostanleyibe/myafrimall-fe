'use client';

import { type ReactNode } from 'react';

import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  subheading: string;
  heading: string;
}

export const AuthLayout = ({
  children,
  heading,
  subheading
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 md:px-16 lg:px-24">
        {children}
      </div>
      {/* Right side - Decorative */}
      <div className="bg-primary relative hidden w-1/2 overflow-hidden md:flex">
        {/* World map dots pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/graphics/world-map-dots.svg"
            alt="World Map Dots"
            className="opacity-40"
            priority
            fill
          />
        </div>
        {/* Text at bottom-left */}
        <div className="relative z-10 mt-auto px-10 pb-14 lg:px-14">
          <h2 className="mb-4 max-w-102.5 text-2xl leading-tight font-semibold text-white">
            {heading}
          </h2>
          <p className="text-rice-flower max-w-145 text-[18px] leading-relaxed">
            {subheading}
          </p>
        </div>
      </div>
    </div>
  );
};
