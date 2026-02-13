import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "yubraj";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const settings = getSettings();
  const updated = { ...settings, ...body };
  saveSettings(updated);

  return NextResponse.json(updated);
}
