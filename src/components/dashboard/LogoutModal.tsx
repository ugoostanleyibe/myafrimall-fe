'use client';

import { useEffect } from 'react';
import { cls } from '@/utils';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function LogoutModal({ isOpen, onConfirm, onCancel }: LogoutModalProps) {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCancel();
      };

      document.addEventListener('keydown', handleEsc);

      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [onCancel, isOpen]);

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
        {/* Modal */}
        <div
          className={cls(
            'relative z-10 w-full max-w-sm rounded-2xl bg-white p-8',
            'animate-fade-in shadow-xl'
          )}
        >
          <div className="mb-6 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="text-primary h-7 w-7"
                fill="none"
              >
                <path
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="text-matte-black text-lg font-bold">Log out</h3>
            <p className="text-manhattan-grey mt-2 text-sm">
              Are you sure you want to log out of your account?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-manhattan-grey transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
