import { GrowthChart } from '@/components/dashboard/GrowthChart';
import { LogoutModal } from '@/components/dashboard/LogoutModal';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { ShipmentList } from '@/components/dashboard/ShipmentList';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { cls } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ClockLoader } from 'react-spinners';

interface DashboardData {
  overview: {
    totalShipment: { count: number; percentage: number; vsLastMonth: number };
    totalExports: { count: number; percentage: number; vsLastMonth: number };
    totalImport: { count: number; percentage: number; vsLastMonth: number };
    balance: number;
  };
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
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, token, isLoading, logOut } = useAuth();

  const [period, setPeriod] = useState('This Month');

  const periodRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setIsPeriodDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push('/login');
      return;
    }

    if (token !== null) {
      let isCancelled = false;

      api.getDashboard(token).then((result) => {
        if (!isCancelled && result.data) {
          setDashboardData(result.data as DashboardData);
        }
      });

      return () => {
        isCancelled = true;
      };
    }
  }, [user, token, isLoading, router]);

  if (isLoading || user === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClockLoader color="#5A65AB" size={50} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          logOut();
        }}
      />
      <Sidebar
        onLogOut={() => setIsLogoutModalOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        user={user}
      />
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="border-grey-hint sticky top-0 right-0 left-0 z-20 border-b bg-white px-7 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="mr-4 lg:hidden"
              >
                <Image
                  src="/graphics/menu.svg"
                  height={24}
                  width={24}
                  alt="Menu"
                />
              </button>
              <h1 className="text-matte-black inline text-xl font-bold">
                Invite &amp; Earn
              </h1>
              <p className="text-zen-grey mt-1 text-xs leading-5 md:max-w-113">
                Keep track of your addresses, location updates. Edit, Delete,
                Update and see all your saved addresses
              </p>
            </div>
          </div>
        </header>
        <div className="px-7 py-5">
          {/* Hero Banner */}
          <div className="bg-comet relative overflow-hidden rounded-lg md:h-61">
            {/* Background image */}
            <Image
              alt="Gradient"
              src="/images/grey-gradient.jpg"
              className="object-cover mix-blend-multiply"
              priority
              fill
            />
            <div className="flex items-center justify-between px-9">
              <div className="md:mt-11">
                <h2 className="text-2xl leading-tight font-black -tracking-[2%] text-white md:text-[42.48px] md:leading-11">
                  <span>KEEP UP WITH YOUR </span>
                  <br className="hidden md:block" />
                  <span>BUSINESS NEEDS</span>
                </h2>
              </div>
              <div className="hidden sm:block">
                <Image
                  src="/images/earth-boxes.png"
                  alt="Global shipping"
                  className="object-cover"
                  height={280}
                  width={280}
                />
              </div>
            </div>
          </div>
          {/* Three Dots */}
          <div className="mt-2.5 flex justify-center gap-3">
            <span className="bg-light-grey h-3 w-3 rounded-full"></span>
            <span className="bg-american h-3 w-3 rounded-full"></span>
            <span className="bg-light-grey h-3 w-3 rounded-full"></span>
          </div>
          {dashboardData === null ? (
            <div className="flex h-100 items-center justify-center">
              <ClockLoader color="#5A65AB" size={64} />
            </div>
          ) : (
            <>
              {/* Overview */}
              <div className="mt-7 flex items-center justify-between">
                <h3 className="text-matte-black text-2xl font-medium">
                  Overview
                </h3>
                <div ref={periodRef} className="relative">
                  <button
                    onClick={() =>
                      setIsPeriodDropdownOpen(!isPeriodDropdownOpen)
                    }
                    className="text-zen-grey border-grey-hint flex w-29 cursor-pointer items-center justify-center gap-1 rounded-lg border py-2 text-sm font-medium"
                  >
                    <span>{period}</span>
                    <Image
                      alt="Caret"
                      src="/graphics/chevron-down.svg"
                      className={cls(
                        isPeriodDropdownOpen && 'rotate-180',
                        'transition-transform'
                      )}
                      height={16}
                      width={16}
                    />
                  </button>
                  {isPeriodDropdownOpen && (
                    <div className="border-grey-hint absolute right-0 w-29 overflow-hidden rounded-lg border bg-white shadow-md">
                      {['This Month', 'Last Month', 'This Year'].map(
                        (option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setIsPeriodDropdownOpen(false);
                              setPeriod(option);
                            }}
                            className={cls(
                              'block w-full py-2 text-center text-sm font-medium whitespace-nowrap hover:bg-gray-100',
                              option !== period
                                ? 'text-manhattan-grey'
                                : 'text-primary'
                            )}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
              <OverviewSection overview={dashboardData.overview} />
              {/* Recent Shipment Section */}
              <div className="mt-10 flex items-center justify-between">
                <h3 className="text-matte-black text-2xl font-medium">
                  Recent shipment
                </h3>
                <button className="text-zen-grey border-grey-hint h-8.5 w-17 rounded-lg border text-sm hover:bg-gray-100">
                  See All
                </button>
              </div>
              <GrowthChart />
              <ShipmentList shipments={dashboardData.recentShipments} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
