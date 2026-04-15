'use client';

import Image from 'next/image';

interface OverviewProps {
  overview: {
    totalShipment: { count: number; percentage: number; vsLastMonth: number };
    totalExports: { count: number; percentage: number; vsLastMonth: number };
    totalImport: { count: number; percentage: number; vsLastMonth: number };
    balance: number;
  };
}

function StatCard({
  vsLastMonth,
  percentage,
  label,
  count,
  icon
}: {
  icon: React.ReactNode;
  vsLastMonth: number;
  percentage: number;
  count: number;
  label: string;
}) {
  return (
    <div className="flex flex-col justify-center rounded-lg bg-white px-4">
      <div className="flex w-fit flex-row-reverse items-center gap-2">
        <span className="text-manhattan-grey text-xs">{label}</span>
        {icon}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-montserrat text-tuatara text-2xl leading-11 font-medium">
          {count}
        </span>
        <div className="text-digital-green flex items-center gap-0.5 text-xs">
          <Image
            src="/graphics/mini-arrow-up.svg"
            alt="Arrow up"
            height={12}
            width={12}
          />
          <span>{percentage}%</span>
        </div>
      </div>
      <p className="font-montserrat leading-4">
        <span className="text-matte-grey text-[8px]">Vs last month: </span>
        <span className="text-strong-grey text-[12px] font-medium">
          {vsLastMonth}
        </span>
      </p>
    </div>
  );
}

export function OverviewSection({ overview }: OverviewProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Balance Card */}
      <div className="bg-primary border-grey-hint flex h-41 w-full flex-col justify-center rounded-lg border pl-6 lg:w-md">
        <p className="text-xs font-light text-white/70">Your Balance</p>
        <p className="mt-2 text-2xl font-black -tracking-[2%] text-white/90">
          ₦
          {new Intl.NumberFormat('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(overview.balance)}
        </p>
        <button className="text-primary mt-6 h-8 w-25 rounded-lg bg-white text-center text-xs font-medium">
          Fund Wallet
        </button>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        {/* Stats Cards */}
        <StatCard
          {...overview.totalShipment}
          label="Total Shipment"
          icon={
            <Image
              src="/graphics/delivery-truck.svg"
              alt="Delivery Truck"
              height={40}
              width={40}
            />
          }
        />
        <StatCard
          {...overview.totalExports}
          label="Total Exports"
          icon={
            <Image
              src="/graphics/arrow-up.svg"
              alt="Arrow Up"
              height={40}
              width={40}
            />
          }
        />
        <StatCard
          {...overview.totalImport}
          label="Total Import"
          icon={
            <Image
              src="/graphics/arrow-down.svg"
              alt="Arrow Down"
              height={40}
              width={40}
            />
          }
        />
      </div>
    </div>
  );
}
