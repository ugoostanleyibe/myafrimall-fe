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

    let cancelled = false;
    api.getDashboard(token).then((result) => {
      if (!cancelled && result.data) {
        setDashboardData(result.data as DashboardData);
      }
    });
    return () => {
      cancelled = true;
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
          <div className="bg-dark-navy mb-6 overflow-hidden rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold">KEEP UP WITH YOUR</h2>
            <h2 className="text-2xl font-bold">BUSINESS NEEDS</h2>
            <div className="mt-4 flex justify-center gap-2">
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
