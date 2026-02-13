import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "yubraj";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET() {
  const testimonials = getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const testimonials = getTestimonials();
  const maxId = testimonials.reduce((max, t) => Math.max(max, parseInt(t.id) || 0), 0);

  const newTestimonial: Testimonial = {
    id: String(maxId + 1),
    name: body.name || "",
    role: body.role || "",
    text: body.text || "",
    rating: body.rating || 5,
    car: body.car || "",
  };

  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);

  return NextResponse.json(newTestimonial, { status: 201 });
}
