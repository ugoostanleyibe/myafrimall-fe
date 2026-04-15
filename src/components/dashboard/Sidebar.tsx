'use client';

import type { User } from '@/lib/api';

import { useState } from 'react';
import { cls } from '@/utils';

import Image from 'next/image';

interface SidebarProps {
  onLogOut: () => void;
  onClose: () => void;
  isOpen: boolean;
  user: User;
}

const navItems = [
  { label: 'Dashboard', icon: '/graphics/dashboard.svg' },
  { label: 'Shipments', icon: '/graphics/ship.svg' },
  { label: 'Our Services', icon: '/graphics/globe.svg' },
  { label: 'Notifications', icon: '/graphics/bell.svg' },
  { label: 'Wallet', icon: '/graphics/credit-card.svg' },
  { label: 'My Addresses', icon: '/graphics/fixed-location.svg' },
  { label: 'Invite & Earn', icon: '/graphics/dollar-sign-badge.svg' },
  { label: 'Help Center', icon: '/graphics/helping-hand.svg' }
];

export function Sidebar({ onLogOut, onClose, isOpen, user }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cls(
          'border-grey-hint fixed z-50 flex h-full w-60 flex-col border-r bg-white transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="border-grey-hint h-25.25 w-full border-b"></div>
        <div className="flex-1 overflow-y-auto px-4 pt-10">
          <nav className="flex flex-col items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveItem(item.label);
                    onClose();
                  }}
                  className={cls(
                    'flex w-45 items-center gap-2 rounded-lg p-4 transition-colors',
                    !isActive
                      ? 'text-manhattan-grey hover:bg-gray-200'
                      : 'bg-comet font-semibold text-white'
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    className={cls(isActive && 'brightness-0 invert')}
                    height={24}
                    width={24}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        {/* User section at bottom */}
        <div className="flex flex-col gap-2 p-6">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-white">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div>
              <p className="text-manhattan-grey text-sm">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
          <button
            onClick={onLogOut}
            className="text-manhattan-grey flex w-full items-center justify-center gap-2 rounded-lg p-4 hover:bg-gray-200"
          >
            <Image
              src="/graphics/log-out.svg"
              alt="Log out"
              height={24}
              width={24}
            />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
