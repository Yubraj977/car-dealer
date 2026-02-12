import { NextRequest, NextResponse } from "next/server";
import { getCars, saveCars } from "@/lib/data";
import type { Car } from "@/lib/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET() {
  const cars = getCars();
  return NextResponse.json(cars);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const cars = getCars();

  const maxId = cars.reduce((max, c) => Math.max(max, parseInt(c.id) || 0), 0);
  const newCar: Car = {
    ...body,
    id: String(maxId + 1),
  };

  cars.push(newCar);
  saveCars(cars);

  return NextResponse.json(newCar, { status: 201 });
}
