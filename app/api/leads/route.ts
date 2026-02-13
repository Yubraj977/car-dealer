import { NextRequest, NextResponse } from "next/server";
import { getLeads, saveLeads } from "@/lib/data";
import type { Lead } from "@/lib/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "yubraj";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = getLeads();
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const leads = getLeads();
  const maxId = leads.reduce((max, l) => Math.max(max, parseInt(l.id) || 0), 0);

  const newLead: Lead = {
    id: String(maxId + 1),
    type: body.type || "contact",
    name: body.name || "",
    email: body.email || "",
    phone: body.phone || "",
    message: body.message,
    carDetails: body.carDetails,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  leads.push(newLead);
  saveLeads(leads);

  return NextResponse.json(newLead, { status: 201 });
}
