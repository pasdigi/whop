const WHOP_API_BASE = "https://api.whop.com/api/v2";

async function whopFetch(endpoint, options = {}) {
  const res = await fetch(`${WHOP_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || `Whop API error (${res.status})`);
  }
  return data;
}

// 1. Buat Lead baru dari form Request an Estimate
export async function createWhopLead({ name, email, phone, address, serviceType, notes }) {
  return whopFetch("/leads", {
    method: "POST",
    body: JSON.stringify({
      company_id: process.env.WHOP_COMPANY_ID,
      name,
      email,
      phone,
      metadata: {
        address,
        service_type: serviceType,
        notes,
        source: "roofing_website_estimate_form",
      },
    }),
  });
}

// 2. Buat Invoice Final Balance (Auto-charge kartu tersimpan atau kirim link manual)
export async function createFinalBalanceInvoice({
  memberId,
  amountUsd,
  description,
  collectionMethod, // "charge_automatically" | "send_invoice"
}) {
  const amountCents = Math.round(Number(amountUsd) * 100);

  return whopFetch("/invoices", {
    method: "POST",
    body: JSON.stringify({
      company_id: process.env.WHOP_COMPANY_ID,
      member_id: memberId,
      collection_method: collectionMethod,
      currency: "usd",
      line_items: [
        {
          description: description || "Roofing Project Final Balance",
          amount: amountCents,
          quantity: 1,
        },
      ],
      auto_advance: true,
    }),
  });
}
