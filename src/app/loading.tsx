'use client';

import { ClockLoader } from 'react-spinners';

export default function Loading() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white">
      <ClockLoader color="#5B5EA6" size={64} />
    </main>
  );
}
