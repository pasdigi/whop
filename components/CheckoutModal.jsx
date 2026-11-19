"use client";

import { useState } from "react";
import {
  WhopElements,
  CheckoutElement,
  ExpressCheckoutElement,
  BrandingElement,
} from "@whop/elements/react";

export default function CheckoutModal({ plan, onClose }) {
  const [completed, setCompleted] = useState(false);
  const [receiptId, setReceiptId] = useState(null);

  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
        >
          ✕
        </button>

        <div className="mb-4 border-b pb-4">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {plan.billingType}
          </span>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{plan.name}</h3>
          <p className="text-2xl font-extrabold text-slate-900">${plan.price}</p>
          {plan.isDeposit && (
            <p className="mt-1 text-xs text-slate-600">
              Your payment method will be saved securely via Whop Setup Intent for seamless final balance billing upon job completion.
            </p>
          )}
        </div>

        {completed ? (
          <div className="rounded-xl bg-emerald-50 p-5 text-center">
            <h4 className="text-lg font-bold text-emerald-800">Payment Confirmed</h4>
            <p className="mt-1 text-sm text-emerald-700">
              Thank you! Your booking for <strong>{plan.name}</strong> is confirmed.
            </p>
            {receiptId && (
              <p className="mt-2 font-mono text-xs text-emerald-600">Receipt: {receiptId}</p>
            )}
            <button
              onClick={onClose}
              className="mt-4 w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Done
            </button>
          </div>
        ) : (
          <WhopElements
            planId={plan.id}
            // Aktifkan setupIntent untuk plan Deposit agar kartu tersimpan (card-on-file)
            setupFutureUsage={plan.isDeposit ? "off_session" : undefined}
          >
            <div className="space-y-4">
              {/* 1. Apple Pay / Google Pay */}
              <ExpressCheckoutElement
                onComplete={(result) => {
                  setReceiptId(result?.receiptId || "CONFIRMED");
                  setCompleted(true);
                }}
              />

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-slate-200" />
                <span className="mx-3 text-xs text-slate-400">or pay with card / financing</span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {/* 2. Main Whop Checkout (Klarna, Afterpay, Splitit muncul otomatis) */}
              <CheckoutElement
                onComplete={(result) => {
                  setReceiptId(result?.receiptId || "CONFIRMED");
                  setCompleted(true);
                }}
              />

              {/* 3. Wajib ada sesuai requirements */}
              <div className="pt-2">
                <BrandingElement />
              </div>
            </div>
          </WhopElements>
        )}
      </div>
    </div>
  );
}
