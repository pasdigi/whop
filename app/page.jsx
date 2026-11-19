"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { trackWhopEvent } from "@/lib/tracking";
import CheckoutModal from "@/components/CheckoutModal";
import EstimateForm from "@/components/EstimateForm";

export default function RoofingHomePage() {
  const [activePlan, setActivePlan] = useState(null);

  function openPlanCheckout(plan) {
    // Custom Pixel Event #1: service_viewed
    trackWhopEvent("service_viewed", {
      service: plan.name,
      price: plan.price,
      plan_id: plan.id,
    });

    // Custom Pixel Event #2: deposit_started (khusus saat klik Deposit)
    if (plan.isDeposit) {
      trackWhopEvent("deposit_started", {
        plan_id: plan.id,
        amount: plan.price,
      });
    }

    setActivePlan(plan);
  }

  const allPlans = [
    siteConfig.plans.inspection,
    siteConfig.plans.deposit,
    siteConfig.plans.flatRate,
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <div>
            <span className="text-lg font-extrabold tracking-tight">{siteConfig.company.name}</span>
            <p className="text-xs text-slate-500">{siteConfig.company.license}</p>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#pricing" className="hover:text-slate-900">Book Online</a>
            <a href="#financing" className="hover:text-slate-900">Financing</a>
            <a href="#area" className="hover:text-slate-900">Service Area</a>
            <a href="#reviews" className="hover:text-slate-900">Reviews</a>
            <a href="#contact" className="hover:text-slate-900">Estimate</a>
          </nav>
          <a
            href="#contact"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {siteConfig.company.phone}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
              ★ {siteConfig.company.rating} Rated ({siteConfig.company.reviewCount} Local Reviews) · {siteConfig.company.yearsInBusiness}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Dependable Roof Repairs & Replacements Without the Runaround.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Book a certified inspection, lock in your project deposit with card-on-file convenience, or request a free estimate in 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => openPlanCheckout(siteConfig.plans.inspection)}
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400"
              >
                Book $149 Inspection
              </button>
              <button
                onClick={() => openPlanCheckout(siteConfig.plans.deposit)}
                className="rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Pay $500 Project Deposit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold">Core Roofing Services</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {siteConfig.servicesOverview.map((svc) => (
            <div key={svc.id} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">{svc.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{svc.summary}</p>
              <p className="mt-4 text-sm font-bold text-amber-700">{svc.startingPrice}</p>
              <button
                onClick={() => openPlanCheckout(siteConfig.plans[svc.planKey])}
                className="mt-4 text-sm font-semibold text-slate-900 underline hover:text-amber-600"
              >
                Book Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Whop Plans */}
      <section id="pricing" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold">Transparent Online Booking</h2>
          <p className="mt-2 text-slate-600">
            Powered securely by Whop Payments. Apple Pay, Google Pay, and flexible financing supported.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {allPlans.map((plan) => (
              <div key={plan.slug} className="flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm">
                <div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {plan.badge}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-extrabold">
                    ${plan.price}{" "}
                    <span className="text-xs font-medium text-slate-500">/ {plan.billingType}</span>
                  </p>
                  <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {plan.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => openPlanCheckout(plan)}
                  className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  {plan.isDeposit ? "Pay $500 Deposit & Save Card" : `Book for $${plan.price}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Callout */}
      <section id="financing" className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-amber-50 border border-amber-200 p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900">{siteConfig.financing.headline}</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">{siteConfig.financing.subheadline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {siteConfig.financing.providers.map((p) => (
              <span key={p} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area & Reviews */}
      <section id="area" className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-2xl font-extrabold">Service Area</h2>
          <p className="mt-2 text-sm text-slate-600">
            Proudly serving <strong>{siteConfig.serviceArea.region}</strong> (ZIPs: {siteConfig.serviceArea.zipCodes}).
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {siteConfig.serviceArea.cities.map((city) => (
              <span key={city} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>

        <div id="reviews" className="space-y-4">
          <h2 className="text-2xl font-extrabold">Homeowner Reviews</h2>
          {siteConfig.reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border bg-white p-5">
              <p className="text-sm text-slate-700">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-2 text-xs font-bold text-slate-900">
                {r.name} · {r.location} ({r.service})
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Estimate Form */}
      <section id="contact" className="bg-slate-900 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 items-center">
          <div className="text-white">
            <h2 className="text-3xl font-extrabold">Ready for an Honest Roof Assessment?</h2>
            <p className="mt-3 text-slate-300">
              Submit your property details for a no-pressure estimate, or call us directly at{" "}
              <strong>{siteConfig.company.phone}</strong>.
            </p>
            <div className="mt-6 text-sm text-slate-400 space-y-1">
              <p>Email: {siteConfig.company.email}</p>
              <p>License: {siteConfig.company.license}</p>
            </div>
          </div>
          <EstimateForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/admin/invoices" className="underline hover:text-slate-800">
            Contractor Final Balance Invoice Demo →
          </Link>
        </p>
      </footer>

      <CheckoutModal plan={activePlan} onClose={() => setActivePlan(null)} />
    </div>
  );
}
