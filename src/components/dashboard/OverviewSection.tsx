'use client';

import Image from 'next/image';

interface OverviewProps {
  overview: {
    balance: number;
    totalShipment: { count: number; percentage: number; vsLastMonth: number };
    totalExports: { count: number; percentage: number; vsLastMonth: number };
    totalImport: { count: number; percentage: number; vsLastMonth: number };
  };
}

export function OverviewSection({ overview }: OverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {/* Balance Card */}
      <div className="rounded-xl bg-primary p-6 text-white">
        <p className="text-sm opacity-80">Your Balance</p>
        <p className="mt-2 text-2xl font-bold">N{formatCurrency(overview.balance)}</p>
        <button className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary">
          Fund Wallet
        </button>
      </div>

      {/* Stats Cards */}
      <StatCard
        label="Total Shipment"
        count={overview.totalShipment.count}
        percentage={overview.totalShipment.percentage}
        vsLastMonth={overview.totalShipment.vsLastMonth}
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <Image src="/graphics/cube.svg" alt="" width={20} height={20} className="text-orange-500" />
          </div>
        }
      />
      <StatCard
        label="Total Exports"
        count={overview.totalExports.count}
        percentage={overview.totalExports.percentage}
        vsLastMonth={overview.totalExports.vsLastMonth}
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <Image src="/graphics/arrow-up.svg" alt="" width={20} height={20} className="text-green-600" />
          </div>
        }
      />
      <StatCard
        label="Total Import"
        count={overview.totalImport.count}
        percentage={overview.totalImport.percentage}
        vsLastMonth={overview.totalImport.vsLastMonth}
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Image src="/graphics/arrow-down.svg" alt="" width={20} height={20} className="text-blue-500" />
          </div>
        }
      />
    </div>
  );
}

function StatCard({
  label,
  count,
  percentage,
  vsLastMonth,
  icon
}: {
  label: string;
  count: number;
  percentage: number;
  vsLastMonth: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{count}</span>
        <span className="text-sm font-medium text-green-500">+{percentage}%</span>
      </div>
      <p className="mt-1 text-xs text-gray-400">
        Vs last month: <span className="font-medium text-gray-600">{vsLastMonth}</span>
      </p>
    </div>
  );
}
