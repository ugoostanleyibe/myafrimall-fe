'use client';

import { useState } from 'react';
import { cls } from '@/utils';

interface GrowthChartProps {
  data: { month: number; value: number }[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  const [activeTab, setActiveTab] = useState<'Year' | 'Month' | 'Week'>('Year');
  const tabs: ('Year' | 'Month' | 'Week')[] = ['Year', 'Month', 'Week'];

  const maxValue = Math.max(...data.map((d) => d.value));
  const yLabels = [1000, 800, 600, 400, 200, 0];
  const chartHeight = 250;
  const chartWidth = 700;
  const padding = { top: 10, right: 20, bottom: 30, left: 10 };

  // Generate SVG path for the line chart
  const points = data.map((d, i) => {
    const x =
      padding.left +
      (i / (data.length - 1)) * (chartWidth - padding.left - padding.right);
    const y =
      padding.top +
      (1 - d.value / 1000) * (chartHeight - padding.top - padding.bottom);
    return { x, y };
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');

  // Create smooth curve
  const smoothPath = points.reduce((path, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cpx = (prev.x + point.x) / 2;
    return `${path} C ${cpx} ${prev.y}, ${cpx} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-bold text-gray-900">Company Growth</h4>
        <div className="flex rounded-lg border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cls(
                'px-4 py-1.5 text-sm',
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-64 w-full min-w-[500px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Horizontal grid lines */}
          {yLabels.map((label) => {
            const y =
              padding.top +
              (1 - label / 1000) * (chartHeight - padding.top - padding.bottom);
            return (
              <g key={label}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="4 4"
                  strokeWidth="0.5"
                />
                <text
                  x={0}
                  y={y + 4}
                  fill="#9CA3AF"
                  fontSize="10"
                >
                  {label > 0 ? label.toLocaleString() : '0'}
                </text>
              </g>
            );
          })}

          {/* Month labels */}
          {data.map((d, i) => {
            const x =
              padding.left +
              (i / (data.length - 1)) *
                (chartWidth - padding.left - padding.right);
            return (
              <text
                key={d.month}
                x={x}
                y={chartHeight - 5}
                fill="#9CA3AF"
                fontSize="10"
                textAnchor="middle"
              >
                {d.month}
              </text>
            );
          })}

          {/* Line */}
          <path
            d={smoothPath}
            fill="none"
            stroke="#5B5EA6"
            strokeWidth="2"
          />

          {/* Dots */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="white"
              stroke="#5B5EA6"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
