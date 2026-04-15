'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cls } from '@/utils';

interface Shipment {
  processingTime: string;
  trackingId: string;
  deliveryTo: string;
  pickUpFrom: string;
  receiver: string;
  sender: string;
  amount: number;
  status: string;
  paid: boolean;
}

interface ShipmentListProps {
  shipments: Shipment[];
}

function NigerianFlag() {
  return (
    <Image src="/graphics/flag-ng.svg" height={18} width={18} alt="Flag" />
  );
}

export function ShipmentList({ shipments }: ShipmentListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="mt-2 flex flex-col gap-2">
      {shipments.map((shipment, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className="border-sweet-grey/50 flex flex-col rounded-[10px] border bg-white p-6"
          >
            {/* Header row - always visible */}
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="grid flex-1 grid-cols-3 gap-4">
                <div className="flex flex-col-reverse gap-2">
                  <p className="text-primary">{shipment.trackingId}</p>
                  <p className="text-grey text-xs">Tracking ID</p>
                </div>
                <div className="flex flex-col-reverse gap-2">
                  <p className="text-strong-grey">{shipment.sender}</p>
                  <p className="text-grey text-xs">Sender</p>
                </div>
                <div className="flex flex-col-reverse gap-2">
                  <p className="text-strong-grey">{shipment.receiver}</p>
                  <p className="text-grey text-xs">Receiver</p>
                </div>
              </div>
              <Image
                alt={isExpanded ? 'Collapse details' : 'Expand details'}
                src="/graphics/caret-up.svg"
                className={cls(
                  'text-gray-400 transition-transform duration-300 ease-in-out lg:ml-70',
                  !isExpanded && 'rotate-180'
                )}
                height={24}
                width={24}
              />
            </div>
            {/* Animated accordion content */}
            <div
              className={cls(
                'grid transition-[grid-template-rows] duration-300 ease-in-out',
                isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cls(
                    'transition-opacity duration-300 ease-in-out',
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <div className="border-sweet-grey/50 mt-4 flex flex-col gap-6 border-t-[0.5px] pt-6">
                    <div className="border-sweet-grey/50 grid grid-cols-2 gap-4 border-b-[0.5px] py-6 pt-2 md:grid-cols-4 lg:flex lg:justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="text-grey text-xs">Pick Up From</p>
                        <div className="text-matte-black flex w-fit flex-row-reverse items-center gap-2 text-sm">
                          <span>{shipment.pickUpFrom}</span>
                          <NigerianFlag />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-grey text-xs">Delivery To</p>
                        <div className="text-matte-black flex w-fit flex-row-reverse items-center gap-2 text-sm">
                          <span>{shipment.deliveryTo}</span>
                          <NigerianFlag />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-grey text-xs">Amount</p>
                        <p className="text-matte-black">
                          ₦{shipment.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-grey text-xs">Status</p>
                        <p
                          className={cls(
                            'mt-2 flex h-8 w-18 rounded-lg text-xs font-medium',
                            shipment.status === 'In Transit' &&
                              'bg-[#FFEAD9] text-[#CB854B]',
                            shipment.status === 'Cancelled' &&
                              'bg-[#FFC0C0] text-[#370000]',
                            shipment.status === 'Delayed' &&
                              'bg-[#C0FBFF] text-[#003337]'
                          )}
                        >
                          <span className="m-auto">{shipment.status}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="text-grey text-xs">Processing Time</p>
                        <div className="text-strong-grey flex flex-row-reverse items-center gap-2">
                          <span>{shipment.processingTime}</span>
                          <Image
                            src="/graphics/clock.svg"
                            height={24}
                            width={24}
                            alt="Time"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row-reverse items-center gap-2">
                        <button
                          disabled={shipment.paid}
                          className={cls(
                            'h-8 w-22.5 rounded-lg text-center text-xs font-semibold',
                            shipment.paid
                              ? 'bg-subtle-white text-grey cursor-not-allowed!'
                              : 'bg-american hover:bg-comet text-white'
                          )}
                        >
                          {shipment.paid ? 'Paid' : 'Pay Now'}
                        </button>
                        <button className="text-comet border-comet h-8 w-22.5 rounded-lg border text-center text-xs font-semibold hover:bg-gray-100">
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
