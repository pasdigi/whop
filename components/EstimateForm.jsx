"use client";

import { useState } from "react";
import { trackWhopEvent } from "@/lib/tracking";

export default function EstimateForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "Full Roof Replacement",
    notes: "",
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit estimate.");

      // Custom Pixel Event #3
      trackWhopEvent("estimate_requested", {
        service_type: form.serviceType,
        address: form.address,
      });

      setStatus({ loading: false, success: true, error: "" });
      setForm({ name: "", email: "", phone: "", address: "", serviceType: "Full Roof Replacement", notes: "" });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-lg border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900">Request a Free Estimate</h3>
      <p className="text-sm text-slate-600">
        Tell us about your roof. Your request goes straight to our dispatch team.
      </p>

      {status.success && (
        <div className="rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
          Estimate request received! A roofing specialist will contact you shortly.
        </div>
      )}
      {status.error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{status.error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
        />
        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
        />
        <input
          placeholder="Property Address / ZIP"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
        />
      </div>

      <select
        value={form.serviceType}
        onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
      >
        <option>Full Roof Replacement</option>
        <option>Emergency Leak Repair ($299 Flat-Rate)</option>
        <option>21-Point Roof & Drone Inspection ($149)</option>
        <option>Storm / Hail Insurance Claim</option>
      </select>

      <textarea
        rows={3}
        placeholder="Describe your roof age, leak location, or timeline..."
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
      />

      <button
        type="submit"
        disabled={status.loading}
        className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50"
      >
        {status.loading ? "Submitting..." : "Get My Free Estimate"}
      </button>
    </form>
  );
}
