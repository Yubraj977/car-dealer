import { NextRequest, NextResponse } from "next/server";
import { getCars, saveCars } from "@/lib/data";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cars = getCars();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const cars = getCars();
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  cars[index] = { ...cars[index], ...body, id };
  saveCars(cars);

  return NextResponse.json(cars[index]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const cars = getCars();
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  const deleted = cars.splice(index, 1)[0];
  saveCars(cars);

  return NextResponse.json(deleted);
}
