import { NextResponse } from "next/server";
import { createWhopLead } from "@/lib/whop-server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, address, serviceType, notes } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const lead = await createWhopLead({ name, email, phone, address, serviceType, notes });
    return NextResponse.json({ success: true, lead });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
