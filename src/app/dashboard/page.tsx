'use client';

import { GrowthChart } from '@/components/dashboard/GrowthChart';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { ShipmentList } from '@/components/dashboard/ShipmentList';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClockLoader } from 'react-spinners';

interface DashboardData {
  overview: {
    totalShipment: { count: number; percentage: number; vsLastMonth: number };
    totalExports: { count: number; percentage: number; vsLastMonth: number };
    totalImport: { count: number; percentage: number; vsLastMonth: number };
    balance: number;
  };
  companyGrowth: { month: number; value: number }[];
  recentShipments: {
    processingTime: string;
    trackingId: string;
    pickUpFrom: string;
    deliveryTo: string;
    receiver: string;
    sender: string;
    amount: number;
    status: string;
    paid: boolean;
  }[];
}

export default function DashboardPage() {
  const { user, token, isLoading, logout } = useAuth();
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (!token) return;

    let isCancelled = false;

    api.getDashboard(token).then((result) => {
      if (!isCancelled && result.data) {
        setDashboardData(result.data as DashboardData);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [user, token, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClockLoader color="#5B5EA6" size={50} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        onLogout={logout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="border-b border-gray-100 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 lg:hidden"
              >
                <Image
                  src="/graphics/menu.svg"
                  alt="Menu"
                  width={24}
                  height={24}
                />
              </button>
              <h1 className="inline text-lg font-bold text-gray-900">
                Invite &amp; Earn
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Keep track of your addresses, location updates. Edit, Delete,
                Update and see all your saved addresses
              </p>
            </div>
          </div>
        </header>
        <div className="p-6">
          {/* Hero Banner */}
          <div className="bg-dark-gnmetal-grey relative mb-6 overflow-hidden rounded-xl p-8 text-white md:min-h-45">
            <div className="relative z-10">
              <h2 className="text-2xl leading-tight font-bold md:text-3xl">
                KEEP UP WITH YOUR
                <br />
                BUSINESS NEEDS
              </h2>
            </div>
            {/* Decorative packages illustration */}
            <div className="absolute top-2 right-4 h-32 w-32 opacity-90 md:top-0 md:right-8 md:h-40 md:w-40">
              <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                {/* Globe */}
                <circle cx="65" cy="45" r="30" fill="#C4A35A" opacity="0.3" />
                <ellipse
                  cx="65"
                  cy="45"
                  rx="30"
                  ry="30"
                  stroke="#C4A35A"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <path
                  d="M65 15 C55 25, 55 65, 65 75"
                  stroke="#C4A35A"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <path
                  d="M65 15 C75 25, 75 65, 65 75"
                  stroke="#C4A35A"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="35"
                  y1="45"
                  x2="95"
                  y2="45"
                  stroke="#C4A35A"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="38"
                  y1="32"
                  x2="92"
                  y2="32"
                  stroke="#C4A35A"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <line
                  x1="38"
                  y1="58"
                  x2="92"
                  y2="58"
                  stroke="#C4A35A"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                {/* Boxes */}
                <rect
                  x="45"
                  y="65"
                  width="25"
                  height="22"
                  rx="2"
                  fill="#C4A35A"
                  opacity="0.8"
                />
                <rect
                  x="48"
                  y="68"
                  width="19"
                  height="3"
                  rx="1"
                  fill="#D4B36A"
                />
                <rect
                  x="70"
                  y="58"
                  width="28"
                  height="25"
                  rx="2"
                  fill="#D4B36A"
                  opacity="0.9"
                />
                <rect
                  x="73"
                  y="61"
                  width="22"
                  height="3"
                  rx="1"
                  fill="#E4C37A"
                />
                <rect
                  x="55"
                  y="50"
                  width="20"
                  height="18"
                  rx="2"
                  fill="#B4934A"
                  opacity="0.7"
                />
                <rect
                  x="58"
                  y="53"
                  width="14"
                  height="3"
                  rx="1"
                  fill="#C4A35A"
                />
              </svg>
            </div>
            <div className="relative z-10 mt-6 flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/40"></span>
              <span className="h-2 w-2 rounded-full bg-white"></span>
              <span className="h-2 w-2 rounded-full bg-white/40"></span>
            </div>
          </div>
          {/* Overview */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Overview</h3>
            <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          {dashboardData && (
            <>
              <OverviewSection overview={dashboardData.overview} />
              {/* Recent Shipment Section */}
              <div className="mt-8 mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent shipment
                </h3>
                <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  See All
                </button>
              </div>
              <GrowthChart data={dashboardData.companyGrowth} />
              <ShipmentList shipments={dashboardData.recentShipments} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
