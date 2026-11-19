import { NextResponse } from "next/server";
import { createFinalBalanceInvoice } from "@/lib/whop-server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { pin, memberId, amountUsd, description, collectionMethod } = body;

    if (pin !== process.env.ADMIN_DEMO_PIN) {
      return NextResponse.json({ error: "Invalid Admin PIN." }, { status: 401 });
    }

    if (!memberId || !amountUsd || Number(amountUsd) <= 0) {
      return NextResponse.json({ error: "Valid Member ID and amount are required." }, { status: 400 });
    }

    const invoice = await createFinalBalanceInvoice({
      memberId,
      amountUsd,
      description,
      collectionMethod: collectionMethod === "send_invoice" ? "send_invoice" : "charge_automatically",
    });

    return NextResponse.json({ success: true, invoice });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
