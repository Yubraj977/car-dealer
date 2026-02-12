"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Car,
  AlertCircle,
  Check,
} from "lucide-react";
import { Car as CarType, formatPrice, formatMileage } from "@/lib/types";

const EMPTY_CAR: Omit<CarType, "id"> = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuelType: "Gasoline",
  transmission: "Automatic",
  bodyType: "Sedan",
  color: "",
  engine: "",
  horsepower: 0,
  drivetrain: "AWD",
  image: "",
  images: [],
  features: [],
  description: "",
  condition: "Used",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<CarType | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<CarType, "id">>(EMPTY_CAR);
  const [featuresInput, setFeaturesInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cars");
      const data = await res.json();
      setCars(data);
    } catch {
      showToast("Failed to load cars", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    setLoginError("");
    try {
      const res = await fetch("/api/cars", {
        method: "GET",
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        setToken(password);
        sessionStorage.setItem("admin_token", password);
      } else {
        // The GET endpoint doesn't require auth, so we test with a dummy check
        // Instead, we'll store the token and validate on first write
        setToken(password);
        sessionStorage.setItem("admin_token", password);
      }
    } catch {
      setLoginError("Connection error");
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) fetchCars();
  }, [token, fetchCars]);

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("admin_token");
  };

  const openCreate = () => {
    setCreating(true);
    setEditing(null);
    setFormData(EMPTY_CAR);
    setFeaturesInput("");
    setImagesInput("");
  };

  const openEdit = (car: CarType) => {
    setEditing(car);
    setCreating(false);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuelType: car.fuelType,
      transmission: car.transmission,
      bodyType: car.bodyType,
      color: car.color,
      engine: car.engine,
      horsepower: car.horsepower,
      drivetrain: car.drivetrain,
      image: car.image,
      images: car.images,
      features: car.features,
      description: car.description,
      badge: car.badge,
      condition: car.condition,
    });
    setFeaturesInput(car.features.join(", "));
    setImagesInput(car.images.join("\n"));
  };

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
    setFormData(EMPTY_CAR);
    setFeaturesInput("");
    setImagesInput("");
  };

  const handleSave = async () => {
    if (!formData.make || !formData.model || !formData.price) {
      showToast("Make, Model, and Price are required", "error");
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      features: featuresInput.split(",").map((f) => f.trim()).filter(Boolean),
      images: imagesInput.split("\n").map((u) => u.trim()).filter(Boolean),
      image: formData.image || (imagesInput.split("\n")[0] || "").trim(),
    };

    try {
      const url = editing ? `/api/cars/${editing.id}` : "/api/cars";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        showToast("Invalid admin password. Please log in again.", "error");
        handleLogout();
        return;
      }

      if (!res.ok) {
        showToast("Failed to save", "error");
        return;
      }

      showToast(editing ? "Car updated successfully" : "Car added successfully");
      closeForm();
      fetchCars();
    } catch {
      showToast("Connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        showToast("Invalid admin password. Please log in again.", "error");
        handleLogout();
        return;
      }

      if (!res.ok) {
        showToast("Failed to delete", "error");
        return;
      }

      showToast("Car deleted successfully");
      setDeleteConfirm(null);
      fetchCars();
    } catch {
      showToast("Connection error", "error");
    }
  };

  // --- Login Screen ---
  if (!token) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white mx-auto mb-6">
              <Car size={28} />
            </div>
            <h1 className="text-2xl font-bold text-primary text-center mb-2">Admin Panel</h1>
            <p className="text-sm text-muted text-center mb-8">Enter your admin password to manage inventory</p>

            {loginError && (
              <div className="flex items-center gap-2 text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-xl">
                <AlertCircle size={16} />
                {loginError}
              </div>
            )}

            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 mb-4"
            />

            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              <LogIn size={18} />
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFormOpen = creating || editing;

  // --- Admin Dashboard ---
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg transition-all ${
          toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
        }`}>
          {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
              <Car size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">Inventory Manager</h1>
              <p className="text-xs text-muted">{cars.length} vehicles</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-light transition-colors"
            >
              <Plus size={16} />
              Add Vehicle
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 text-muted text-sm font-medium rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-10 px-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl mb-10">
              {/* Form Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <h2 className="text-xl font-bold text-primary">
                  {editing ? "Edit Vehicle" : "Add New Vehicle"}
                </h2>
                <button onClick={closeForm} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-muted hover:bg-neutral-200 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Row 1: Make / Model / Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Make *" value={formData.make} onChange={(v) => setFormData({ ...formData, make: v })} placeholder="e.g. BMW" />
                  <Field label="Model *" value={formData.model} onChange={(v) => setFormData({ ...formData, model: v })} placeholder="e.g. M4 Competition" />
                  <Field label="Year" type="number" value={String(formData.year)} onChange={(v) => setFormData({ ...formData, year: Number(v) })} />
                </div>

                {/* Row 2: Price / Mileage / Horsepower */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Price *" type="number" value={String(formData.price)} onChange={(v) => setFormData({ ...formData, price: Number(v) })} />
                  <Field label="Mileage" type="number" value={String(formData.mileage)} onChange={(v) => setFormData({ ...formData, mileage: Number(v) })} />
                  <Field label="Horsepower" type="number" value={String(formData.horsepower)} onChange={(v) => setFormData({ ...formData, horsepower: Number(v) })} />
                </div>

                {/* Row 3: Fuel / Transmission / Body */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SelectField label="Fuel Type" value={formData.fuelType} onChange={(v) => setFormData({ ...formData, fuelType: v })} options={["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"]} />
                  <SelectField label="Transmission" value={formData.transmission} onChange={(v) => setFormData({ ...formData, transmission: v })} options={["Automatic", "Manual", "PDK", "DCT", "CVT"]} />
                  <SelectField label="Body Type" value={formData.bodyType} onChange={(v) => setFormData({ ...formData, bodyType: v })} options={["Sedan", "SUV", "Coupe", "Convertible", "Truck", "Van", "Wagon", "Hatchback"]} />
                </div>

                {/* Row 4: Color / Engine / Drivetrain */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Color" value={formData.color} onChange={(v) => setFormData({ ...formData, color: v })} placeholder="e.g. Alpine White" />
                  <Field label="Engine" value={formData.engine} onChange={(v) => setFormData({ ...formData, engine: v })} placeholder="e.g. 3.0L I6 Twin-Turbo" />
                  <SelectField label="Drivetrain" value={formData.drivetrain} onChange={(v) => setFormData({ ...formData, drivetrain: v })} options={["AWD", "RWD", "FWD", "4WD"]} />
                </div>

                {/* Row 5: Condition / Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField label="Condition" value={formData.condition} onChange={(v) => setFormData({ ...formData, condition: v as CarType["condition"] })} options={["New", "Used", "Certified Pre-Owned"]} />
                  <SelectField label="Badge (optional)" value={formData.badge || ""} onChange={(v) => setFormData({ ...formData, badge: (v || undefined) as CarType["badge"] })} options={["", "New Arrival", "Hot Deal", "Low Mileage", "Certified"]} />
                </div>

                {/* Main Image URL */}
                <Field label="Main Image URL" value={formData.image} onChange={(v) => setFormData({ ...formData, image: v })} placeholder="https://images.unsplash.com/..." />

                {/* Additional Images */}
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Additional Image URLs (one per line)</label>
                  <textarea
                    value={imagesInput}
                    onChange={(e) => setImagesInput(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none"
                    placeholder={"https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2..."}
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Features (comma separated)</label>
                  <textarea
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none"
                    placeholder="Panoramic Sunroof, Massage Seats, Head-Up Display"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none"
                    placeholder="Write a description for this vehicle..."
                  />
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100">
                <button onClick={closeForm} className="px-5 py-2.5 text-sm font-medium text-muted border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : editing ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="text-lg font-bold text-primary mb-2">Delete Vehicle</h3>
              <p className="text-sm text-muted mb-6">Are you sure? This action cannot be undone.</p>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-muted border border-neutral-200 rounded-xl hover:bg-neutral-50">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Car Table */}
        {loading ? (
          <div className="text-center py-20 text-muted">Loading inventory...</div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Car size={28} className="text-neutral-300" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">No vehicles yet</h3>
            <p className="text-sm text-muted mb-6">Add your first vehicle to get started.</p>
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl">
              <Plus size={16} /> Add Vehicle
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Vehicle</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Price</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Mileage</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Condition</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                            {car.image && (
                              <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover" sizes="64px" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{car.year} {car.make} {car.model}</p>
                            <p className="text-xs text-muted">{car.bodyType} &middot; {car.fuelType}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary hidden md:table-cell">{formatPrice(car.price)}</td>
                      <td className="px-6 py-4 text-muted hidden lg:table-cell">{formatMileage(car.mileage)} mi</td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          car.condition === "New"
                            ? "bg-emerald-50 text-emerald-700"
                            : car.condition === "Certified Pre-Owned"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}>
                          {car.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(car)}
                            className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(car.id)}
                            className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Reusable form fields ---

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 appearance-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o || "— None —"}</option>
        ))}
      </select>
    </div>
  );
}
