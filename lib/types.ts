export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  engine: string;
  horsepower: number;
  drivetrain: string;
  image: string;
  images: string[];
  features: string[];
  description: string;
  badge?: "New Arrival" | "Hot Deal" | "Low Mileage" | "Certified";
  condition: "New" | "Used" | "Certified Pre-Owned";
}

export interface Lead {
  id: string;
  type: "contact" | "car-finder";
  name: string;
  email: string;
  phone: string;
  message?: string;
  carDetails?: Record<string, string>;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  car: string;
}

export interface Settings {
  phone: string;
  email: string;
  address: string;
  hours: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export const conditions = ["New", "Used", "Certified Pre-Owned"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage);
}
