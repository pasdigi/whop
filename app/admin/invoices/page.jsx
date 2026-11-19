"use client";

import { useState } from "react";

export default function FinalInvoiceDemoPage() {
  const [form, setForm] = useState({
    pin: "",
    memberId: "",
    amountUsd: "8500",
    description: "Full Architectural Shingle Replacement - Final Balance (Less $500 Deposit)",
    collectionMethod: "charge_automatically",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateInvoice(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invoice creation failed.");
      setResult(data.invoice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-extrabold text-slate-900">Final Balance Invoice (Whop Invoices API)</h1>
      <p className="mt-1 text-sm text-slate-600">
        Bill the remaining project balance to a customer who saved their card during the $500 deposit checkout.
      </p>

      <form onSubmit={handleCreateInvoice} className="mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <input
          required
          type="password"
          placeholder="Admin Demo PIN"
          value={form.pin}
          onChange={(e) => setForm({ ...form, pin: e.target.value })}
          className="w-full rounded-xl border px-3.5 py-2.5 text-sm"
        />
        <input
          required
          placeholder="Whop Member ID (e.g. mem_xxxxxxxx)"
          value={form.memberId}
          onChange={(e) => setForm({ ...form, memberId: e.target.value })}
          className="w-full rounded-xl border px-3.5 py-2.5 text-sm"
        />
        <input
          required
          type="number"
          step="0.01"
          placeholder="Final Balance Amount (USD)"
          value={form.amountUsd}
          onChange={(e) => setForm({ ...form, amountUsd: e.target.value })}
          className="w-full rounded-xl border px-3.5 py-2.5 text-sm"
        />
        <input
          required
          placeholder="Invoice Line Item Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-xl border px-3.5 py-2.5 text-sm"
        />
        <select
          value={form.collectionMethod}
          onChange={(e) => setForm({ ...form, collectionMethod: e.target.value })}
          className="w-full rounded-xl border px-3.5 py-2.5 text-sm"
        >
          <option value="charge_automatically">Auto-Charge Stored Card on File</option>
          <option value="send_invoice">Send Invoice Link for Manual Payment</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Processing Invoice..." : "Create Final Balance Invoice"}
        </button>

        {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {result && (
          <pre className="overflow-x-auto rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </form>
    </div>
  );
}
