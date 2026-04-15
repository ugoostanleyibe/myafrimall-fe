import Image from 'next/image';

import { useState } from 'react';

import { cls } from '@/utils';

export function GrowthChart() {
  const [activeTab, setActiveTab] = useState('Year');

  return (
    <div className="border-grey-hint mt-6 flex flex-col gap-5 rounded-xl border bg-white px-5 py-4">
      <div className="flex items-center justify-between">
        <h4 className="text-cosmos font-manrope text-lg font-semibold">
          Company Growth
        </h4>
        <div className="bg-titanium-white flex rounded-lg p-1">
          {['Year', 'Month', 'Week'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cls(
                'h-8 w-22 rounded-sm text-center text-sm transition-colors',
                activeTab === tab ? 'text-cosmos bg-white' : 'text-grey-navy'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <Image
        src="/graphics/growth-chart.svg"
        alt="Company Growth Chart"
        className="w-full"
        height={350}
        width={800}
        priority
      />
    </div>
  );
}
