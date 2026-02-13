import fs from "fs";
import path from "path";
import type { Car, Lead, Testimonial, Settings } from "./types";

export type { Car, Lead, Testimonial, Settings } from "./types";
export { conditions, formatPrice, formatMileage } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CARS_PATH = path.join(DATA_DIR, "cars.json");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");
const TESTIMONIALS_PATH = path.join(DATA_DIR, "testimonials.json");
const SETTINGS_PATH = path.join(DATA_DIR, "settings.json");

// --- Cars ---

export function getCars(): Car[] {
  const raw = fs.readFileSync(CARS_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveCars(cars: Car[]): void {
  fs.writeFileSync(CARS_PATH, JSON.stringify(cars, null, 2));
}

export function getCarById(id: string): Car | undefined {
  return getCars().find((c) => c.id === id);
}

export function getDerivedData() {
  const cars = getCars();
  return {
    makes: [...new Set(cars.map((c) => c.make))].sort(),
    bodyTypes: [...new Set(cars.map((c) => c.bodyType))].sort(),
    fuelTypes: [...new Set(cars.map((c) => c.fuelType))].sort(),
  };
}

// --- Leads ---

export function getLeads(): Lead[] {
  const raw = fs.readFileSync(LEADS_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveLeads(leads: Lead[]): void {
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2));
}

export function getLeadById(id: string): Lead | undefined {
  return getLeads().find((l) => l.id === id);
}

// --- Testimonials ---

export function getTestimonials(): Testimonial[] {
  const raw = fs.readFileSync(TESTIMONIALS_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  fs.writeFileSync(TESTIMONIALS_PATH, JSON.stringify(testimonials, null, 2));
}

// --- Settings ---

export function getSettings(): Settings {
  const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveSettings(settings: Settings): void {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
}
