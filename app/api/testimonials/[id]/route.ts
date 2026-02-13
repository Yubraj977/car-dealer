import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/data";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "yubraj";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const testimonials = getTestimonials();
  const index = testimonials.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  testimonials[index] = { ...testimonials[index], ...body, id };
  saveTestimonials(testimonials);

  return NextResponse.json(testimonials[index]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const testimonials = getTestimonials();
  const index = testimonials.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  const deleted = testimonials.splice(index, 1)[0];
  saveTestimonials(testimonials);

  return NextResponse.json(deleted);
}
