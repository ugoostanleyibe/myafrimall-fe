'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cls } from '@/utils';

interface Shipment {
  trackingId: string;
  sender: string;
  receiver: string;
  pickUpFrom: string;
  deliveryTo: string;
  amount: number;
  status: string;
  processingTime: string;
  paid: boolean;
}

interface ShipmentListProps {
  shipments: Shipment[];
}

export function ShipmentList({ shipments }: ShipmentListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return 'bg-green-100 text-green-700';
      case 'delayed':
        return 'bg-red-100 text-red-700';
      case 'delivered':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const NigeriaFlag = () => (
    <span className="inline-flex gap-0.5">
      <span className="inline-block h-3 w-1 bg-green-600"></span>
      <span className="inline-block h-3 w-1 border border-gray-200 bg-white"></span>
      <span className="inline-block h-3 w-1 bg-green-600"></span>
    </span>
  );

  return (
    <div className="flex flex-col gap-4">
      {shipments.map((shipment, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-gray-100 bg-white"
        >
          {/* Header row - always visible */}
          <div
            className="flex cursor-pointer items-center justify-between p-6"
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <div className="grid flex-1 grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400">Tracking ID</p>
                <p className="text-sm font-medium text-primary">
                  {shipment.trackingId}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Sender</p>
                <p className="text-sm font-medium text-gray-900">
                  {shipment.sender}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Receiver</p>
                <p className="text-sm font-medium text-gray-900">
                  {shipment.receiver}
                </p>
              </div>
            </div>
            <Image
              src="/graphics/chevron-down.svg"
              alt=""
              width={20}
              height={20}
              className={cls(
                'text-gray-400 transition-transform',
                expandedIndex === index && 'rotate-180'
              )}
            />
          </div>

          {/* Expanded details */}
          {expandedIndex === index && (
            <div className="border-t border-gray-50 px-6 pb-6">
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-400">Pick Up From</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-900">
                    <NigeriaFlag />
                    {shipment.pickUpFrom}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Delivery To</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-900">
                    <NigeriaFlag />
                    {shipment.deliveryTo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    N{shipment.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={cls(
                      'mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium',
                      getStatusColor(shipment.status)
                    )}
                  >
                    {shipment.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Image src="/graphics/clock.svg" alt="" width={16} height={16} />
                  <span>Processing time</span>
                  <span className="font-medium text-gray-900">
                    {shipment.processingTime}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                    View More
                  </button>
                  {shipment.paid ? (
                    <span className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400">
                      Paid
                    </span>
                  ) : (
                    <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
