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
  LayoutDashboard,
  Users,
  Star,
  Settings,
  ChevronRight,
  Eye,
  Search,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Menu,
  ExternalLink,
} from "lucide-react";
import { Car as CarType, Lead, Testimonial, Settings as SettingsType, formatPrice, formatMileage } from "@/lib/types";

type Tab = "dashboard" | "inventory" | "leads" | "testimonials" | "settings";

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

const EMPTY_TESTIMONIAL: Omit<Testimonial, "id"> = {
  name: "",
  role: "",
  text: "",
  rating: 5,
  car: "",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Inventory state
  const [cars, setCars] = useState<CarType[]>([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const [editing, setEditing] = useState<CarType | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<CarType, "id">>(EMPTY_CAR);
  const [featuresInput, setFeaturesInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [carSearch, setCarSearch] = useState("");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadFilter, setLeadFilter] = useState<"all" | "contact" | "car-finder">("all");
  const [leadStatusFilter, setLeadStatusFilter] = useState<"all" | "new" | "contacted" | "closed">("all");

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [creatingTestimonial, setCreatingTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState<Omit<Testimonial, "id">>(EMPTY_TESTIMONIAL);
  const [deleteTestimonialConfirm, setDeleteTestimonialConfirm] = useState<string | null>(null);

  // Settings state
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsForm, setSettingsForm] = useState<SettingsType | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Data fetching ---
  const fetchCars = useCallback(async () => {
    setCarsLoading(true);
    try {
      const res = await fetch("/api/cars");
      setCars(await res.json());
    } catch {
      showToast("Failed to load cars", "error");
    } finally {
      setCarsLoading(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setLeads(await res.json());
    } catch {
      showToast("Failed to load leads", "error");
    } finally {
      setLeadsLoading(false);
    }
  }, [token]);

  const fetchTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      setTestimonials(await res.json());
    } catch {
      showToast("Failed to load testimonials", "error");
    } finally {
      setTestimonialsLoading(false);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
      setSettingsForm(data);
    } catch {
      showToast("Failed to load settings", "error");
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  // --- Auth ---
  const handleLogin = async () => {
    setLoginError("");
    setToken(password);
    sessionStorage.setItem("admin_token", password);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCars();
      fetchLeads();
      fetchTestimonials();
      fetchSettings();
    }
  }, [token, fetchCars, fetchLeads, fetchTestimonials, fetchSettings]);

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("admin_token");
  };

  // --- Inventory handlers ---
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
      make: car.make, model: car.model, year: car.year, price: car.price,
      mileage: car.mileage, fuelType: car.fuelType, transmission: car.transmission,
      bodyType: car.bodyType, color: car.color, engine: car.engine,
      horsepower: car.horsepower, drivetrain: car.drivetrain, image: car.image,
      images: car.images, features: car.features, description: car.description,
      badge: car.badge, condition: car.condition,
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

  const handleSaveCar = async () => {
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        showToast("Invalid admin password. Please log in again.", "error");
        handleLogout();
        return;
      }
      if (!res.ok) { showToast("Failed to save", "error"); return; }
      showToast(editing ? "Car updated successfully" : "Car added successfully");
      closeForm();
      fetchCars();
    } catch {
      showToast("Connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { showToast("Invalid admin password.", "error"); handleLogout(); return; }
      if (!res.ok) { showToast("Failed to delete", "error"); return; }
      showToast("Car deleted successfully");
      setDeleteConfirm(null);
      fetchCars();
    } catch {
      showToast("Connection error", "error");
    }
  };

  // --- Lead handlers ---
  const updateLeadStatus = async (id: string, status: Lead["status"]) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast("Lead status updated");
        fetchLeads();
        if (selectedLead?.id === id) {
          setSelectedLead({ ...selectedLead, status });
        }
      }
    } catch {
      showToast("Failed to update lead", "error");
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Lead deleted");
        fetchLeads();
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch {
      showToast("Failed to delete lead", "error");
    }
  };

  // --- Testimonial handlers ---
  const openCreateTestimonial = () => {
    setCreatingTestimonial(true);
    setEditingTestimonial(null);
    setTestimonialForm(EMPTY_TESTIMONIAL);
  };

  const openEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setCreatingTestimonial(false);
    setTestimonialForm({ name: t.name, role: t.role, text: t.text, rating: t.rating, car: t.car });
  };

  const closeTestimonialForm = () => {
    setEditingTestimonial(null);
    setCreatingTestimonial(false);
    setTestimonialForm(EMPTY_TESTIMONIAL);
  };

  const handleSaveTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.text) {
      showToast("Name and text are required", "error");
      return;
    }
    setSaving(true);
    try {
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : "/api/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(testimonialForm),
      });
      if (res.status === 401) { showToast("Unauthorized", "error"); handleLogout(); return; }
      if (!res.ok) { showToast("Failed to save", "error"); return; }
      showToast(editingTestimonial ? "Testimonial updated" : "Testimonial added");
      closeTestimonialForm();
      fetchTestimonials();
    } catch {
      showToast("Connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Testimonial deleted");
        setDeleteTestimonialConfirm(null);
        fetchTestimonials();
      }
    } catch {
      showToast("Connection error", "error");
    }
  };

  // --- Settings handlers ---
  const handleSaveSettings = async () => {
    if (!settingsForm) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(settingsForm),
      });
      if (res.status === 401) { showToast("Unauthorized", "error"); handleLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        showToast("Settings saved");
      }
    } catch {
      showToast("Connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  // --- Computed ---
  const filteredCars = cars.filter((car) => {
    if (!carSearch) return true;
    const q = carSearch.toLowerCase();
    return `${car.year} ${car.make} ${car.model} ${car.color}`.toLowerCase().includes(q);
  });

  const filteredLeads = leads.filter((lead) => {
    if (leadFilter !== "all" && lead.type !== leadFilter) return false;
    if (leadStatusFilter !== "all" && lead.status !== leadStatusFilter) return false;
    return true;
  });

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const totalValue = cars.reduce((sum, c) => sum + c.price, 0);
  const thisWeekLeads = leads.filter((l) => {
    const d = new Date(l.createdAt);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).length;

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
            <p className="text-sm text-muted text-center mb-8">Enter your admin password to continue</p>
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

  const isCarFormOpen = creating || editing;
  const isTestimonialFormOpen = creatingTestimonial || editingTestimonial;

  const navItems: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { key: "inventory", label: "Inventory", icon: <Car size={20} />, badge: cars.length },
    { key: "leads", label: "Leads", icon: <Users size={20} />, badge: newLeadsCount || undefined },
    { key: "testimonials", label: "Testimonials", icon: <Star size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[60] flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${
          toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
        }`}>
          {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-neutral-100 z-50 flex flex-col transition-transform lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
              <Car size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
              <p className="text-xs text-muted">Dealership Manager</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.key
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-neutral-50 hover:text-primary"
              }`}
            >
              {item.icon}
              {item.label}
              {item.badge !== undefined && (
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  activeTab === item.key ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:bg-neutral-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar (mobile) */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-neutral-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-neutral-50">
            <Menu size={20} />
          </button>
          <h1 className="font-semibold text-primary capitalize">{activeTab}</h1>
        </div>

        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* ==================== DASHBOARD TAB ==================== */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Dashboard</h2>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Vehicles", value: cars.length, icon: <Car size={20} />, color: "bg-blue-50 text-blue-600" },
                  { label: "Total Leads", value: leads.length, icon: <Users size={20} />, color: "bg-purple-50 text-purple-600" },
                  { label: "New This Week", value: thisWeekLeads, icon: <TrendingUp size={20} />, color: "bg-emerald-50 text-emerald-600" },
                  { label: "Inventory Value", value: formatPrice(totalValue), icon: <DollarSign size={20} />, color: "bg-amber-50 text-amber-600" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 border border-neutral-100">
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent leads */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-primary">Recent Leads</h3>
                    <button onClick={() => setActiveTab("leads")} className="text-sm text-accent hover:underline flex items-center gap-1">
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  {leads.length === 0 ? (
                    <p className="text-sm text-muted py-4">No leads yet</p>
                  ) : (
                    <div className="space-y-3">
                      {leads.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                          <div>
                            <p className="text-sm font-medium text-primary">{lead.name}</p>
                            <p className="text-xs text-muted">{lead.type === "contact" ? "Contact Form" : "Car Finder"} &middot; {new Date(lead.createdAt).toLocaleDateString()}</p>
                          </div>
                          <StatusBadge status={lead.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <h3 className="font-semibold text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => { setActiveTab("inventory"); setTimeout(openCreate, 100); }}
                      className="w-full flex items-center gap-3 p-4 bg-neutral-50 rounded-xl hover:bg-accent/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Plus size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">Add Vehicle</p>
                        <p className="text-xs text-muted">Add a new car to inventory</p>
                      </div>
                    </button>
                    <a
                      href="/"
                      target="_blank"
                      className="w-full flex items-center gap-3 p-4 bg-neutral-50 rounded-xl hover:bg-accent/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <ExternalLink size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">View Site</p>
                        <p className="text-xs text-muted">Open the public website</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== INVENTORY TAB ==================== */}
          {activeTab === "inventory" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-primary">Inventory</h2>
                <button
                  onClick={openCreate}
                  className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-light transition-colors"
                >
                  <Plus size={16} />
                  Add Vehicle
                </button>
              </div>

              {/* Search bar */}
              <div className="relative mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={carSearch}
                  onChange={(e) => setCarSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Car Form Modal */}
              {isCarFormOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-10 px-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl mb-10">
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                      <h2 className="text-xl font-bold text-primary">
                        {editing ? "Edit Vehicle" : "Add New Vehicle"}
                      </h2>
                      <button onClick={closeForm} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-muted hover:bg-neutral-200 transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                      {/* Image preview */}
                      {formData.image && (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100">
                          <Image src={formData.image} alt="Preview" fill className="object-cover" sizes="600px" />
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Make *" value={formData.make} onChange={(v) => setFormData({ ...formData, make: v })} placeholder="e.g. BMW" />
                        <Field label="Model *" value={formData.model} onChange={(v) => setFormData({ ...formData, model: v })} placeholder="e.g. M4 Competition" />
                        <Field label="Year" type="number" value={String(formData.year)} onChange={(v) => setFormData({ ...formData, year: Number(v) })} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Price *" type="number" value={String(formData.price)} onChange={(v) => setFormData({ ...formData, price: Number(v) })} />
                        <Field label="Mileage" type="number" value={String(formData.mileage)} onChange={(v) => setFormData({ ...formData, mileage: Number(v) })} />
                        <Field label="Horsepower" type="number" value={String(formData.horsepower)} onChange={(v) => setFormData({ ...formData, horsepower: Number(v) })} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <SelectField label="Fuel Type" value={formData.fuelType} onChange={(v) => setFormData({ ...formData, fuelType: v })} options={["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"]} />
                        <SelectField label="Transmission" value={formData.transmission} onChange={(v) => setFormData({ ...formData, transmission: v })} options={["Automatic", "Manual", "PDK", "DCT", "CVT"]} />
                        <SelectField label="Body Type" value={formData.bodyType} onChange={(v) => setFormData({ ...formData, bodyType: v })} options={["Sedan", "SUV", "Coupe", "Convertible", "Truck", "Van", "Wagon", "Hatchback"]} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Color" value={formData.color} onChange={(v) => setFormData({ ...formData, color: v })} placeholder="e.g. Alpine White" />
                        <Field label="Engine" value={formData.engine} onChange={(v) => setFormData({ ...formData, engine: v })} placeholder="e.g. 3.0L I6 Twin-Turbo" />
                        <SelectField label="Drivetrain" value={formData.drivetrain} onChange={(v) => setFormData({ ...formData, drivetrain: v })} options={["AWD", "RWD", "FWD", "4WD"]} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField label="Condition" value={formData.condition} onChange={(v) => setFormData({ ...formData, condition: v as CarType["condition"] })} options={["New", "Used", "Certified Pre-Owned"]} />
                        <SelectField label="Badge (optional)" value={formData.badge || ""} onChange={(v) => setFormData({ ...formData, badge: (v || undefined) as CarType["badge"] })} options={["", "New Arrival", "Hot Deal", "Low Mileage", "Certified"]} />
                      </div>
                      <Field label="Main Image URL" value={formData.image} onChange={(v) => setFormData({ ...formData, image: v })} placeholder="https://images.unsplash.com/..." />
                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Additional Image URLs (one per line)</label>
                        <textarea value={imagesInput} onChange={(e) => setImagesInput(e.target.value)} rows={3} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none" placeholder={"https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2..."} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Features (comma separated)</label>
                        <textarea value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} rows={2} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none" placeholder="Panoramic Sunroof, Massage Seats, Head-Up Display" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Description</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none" placeholder="Write a description for this vehicle..." />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100">
                      <button onClick={closeForm} className="px-5 py-2.5 text-sm font-medium text-muted border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">Cancel</button>
                      <button onClick={handleSaveCar} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50">
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
                      <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-muted border border-neutral-200 rounded-xl hover:bg-neutral-50">Cancel</button>
                      <button onClick={() => handleDeleteCar(deleteConfirm)} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Car Table */}
              {carsLoading ? (
                <div className="text-center py-20 text-muted">Loading inventory...</div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <Car size={28} className="text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{carSearch ? "No vehicles match your search" : "No vehicles yet"}</h3>
                  <p className="text-sm text-muted mb-6">{carSearch ? "Try a different search term" : "Add your first vehicle to get started."}</p>
                  {!carSearch && (
                    <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl">
                      <Plus size={16} /> Add Vehicle
                    </button>
                  )}
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
                        {filteredCars.map((car) => (
                          <tr key={car.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                                  {car.image && <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover" sizes="64px" />}
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
                                car.condition === "New" ? "bg-emerald-50 text-emerald-700" : car.condition === "Certified Pre-Owned" ? "bg-blue-50 text-blue-700" : "bg-neutral-100 text-neutral-600"
                              }`}>{car.condition}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => openEdit(car)} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"><Pencil size={14} /></button>
                                <button onClick={() => setDeleteConfirm(car.id)} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14} /></button>
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
          )}

          {/* ==================== LEADS TAB ==================== */}
          {activeTab === "leads" && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Leads & Inquiries</h2>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted uppercase">Type:</label>
                  {(["all", "contact", "car-finder"] as const).map((v) => (
                    <button key={v} onClick={() => setLeadFilter(v)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${leadFilter === v ? "bg-primary text-white" : "bg-neutral-100 text-muted hover:bg-neutral-200"}`}>
                      {v === "all" ? "All" : v === "contact" ? "Contact" : "Car Finder"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-muted uppercase">Status:</label>
                  {(["all", "new", "contacted", "closed"] as const).map((v) => (
                    <button key={v} onClick={() => setLeadStatusFilter(v)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${leadStatusFilter === v ? "bg-primary text-white" : "bg-neutral-100 text-muted hover:bg-neutral-200"}`}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead detail slide-out */}
              {selectedLead && (
                <div className="fixed inset-0 bg-black/50 z-40 flex justify-end" onClick={() => setSelectedLead(null)}>
                  <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                      <h3 className="text-lg font-bold text-primary">Lead Details</h3>
                      <button onClick={() => setSelectedLead(null)} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-muted hover:bg-neutral-200"><X size={18} /></button>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">Name</p>
                        <p className="text-sm font-medium text-primary">{selectedLead.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">Email</p>
                          <p className="text-sm text-primary">{selectedLead.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">Phone</p>
                          <p className="text-sm text-primary">{selectedLead.phone || "—"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">Type</p>
                          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${selectedLead.type === "contact" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                            {selectedLead.type === "contact" ? "Contact" : "Car Finder"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">Date</p>
                          <p className="text-sm text-primary">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      {selectedLead.message && (
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-1">Message</p>
                          <p className="text-sm text-primary whitespace-pre-wrap bg-neutral-50 p-4 rounded-xl">{selectedLead.message}</p>
                        </div>
                      )}
                      {selectedLead.carDetails && (
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider mb-2">Car Request Details</p>
                          <div className="bg-neutral-50 p-4 rounded-xl space-y-2">
                            {Object.entries(selectedLead.carDetails).map(([key, val]) => (
                              val ? (
                                <div key={key} className="flex justify-between text-sm">
                                  <span className="text-muted capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                                  <span className="text-primary font-medium">{val}</span>
                                </div>
                              ) : null
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-2">Update Status</p>
                        <div className="flex gap-2">
                          {(["new", "contacted", "closed"] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => updateLeadStatus(selectedLead.id, s)}
                              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                                selectedLead.status === s ? "bg-primary text-white" : "bg-neutral-100 text-muted hover:bg-neutral-200"
                              }`}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => { deleteLead(selectedLead.id); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                        <Trash2 size={14} /> Delete Lead
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Leads table */}
              {leadsLoading ? (
                <div className="text-center py-20 text-muted">Loading leads...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={28} className="text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">No leads yet</h3>
                  <p className="text-sm text-muted">Leads from contact and car finder forms will appear here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50/50">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Name</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Type</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Email</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Date</th>
                          <th className="text-right px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-medium text-primary">{lead.name}</p>
                              <p className="text-xs text-muted md:hidden">{lead.type === "contact" ? "Contact" : "Car Finder"}</p>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${lead.type === "contact" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                                {lead.type === "contact" ? "Contact" : "Car Finder"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted hidden lg:table-cell">{lead.email}</td>
                            <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                            <td className="px-6 py-4 text-muted hidden md:table-cell">{new Date(lead.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end">
                                <button onClick={() => setSelectedLead(lead)} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"><Eye size={14} /></button>
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
          )}

          {/* ==================== TESTIMONIALS TAB ==================== */}
          {activeTab === "testimonials" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-primary">Testimonials</h2>
                <button onClick={openCreateTestimonial} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-light transition-colors">
                  <Plus size={16} /> Add Testimonial
                </button>
              </div>

              {/* Testimonial Form Modal */}
              {isTestimonialFormOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-10 px-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl mb-10">
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                      <h2 className="text-xl font-bold text-primary">{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</h2>
                      <button onClick={closeTestimonialForm} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-muted hover:bg-neutral-200"><X size={18} /></button>
                    </div>
                    <div className="p-6 space-y-4">
                      <Field label="Name *" value={testimonialForm.name} onChange={(v) => setTestimonialForm({ ...testimonialForm, name: v })} placeholder="e.g. John Doe" />
                      <Field label="Role" value={testimonialForm.role} onChange={(v) => setTestimonialForm({ ...testimonialForm, role: v })} placeholder="e.g. Business Owner" />
                      <Field label="Car Purchased" value={testimonialForm.car} onChange={(v) => setTestimonialForm({ ...testimonialForm, car: v })} placeholder="e.g. BMW M4" />
                      <SelectField label="Rating" value={String(testimonialForm.rating)} onChange={(v) => setTestimonialForm({ ...testimonialForm, rating: Number(v) })} options={["5", "4", "3", "2", "1"]} />
                      <div>
                        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5 block">Review Text *</label>
                        <textarea value={testimonialForm.text} onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })} rows={4} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent/50 resize-none" placeholder="Write the testimonial..." />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100">
                      <button onClick={closeTestimonialForm} className="px-5 py-2.5 text-sm font-medium text-muted border border-neutral-200 rounded-xl hover:bg-neutral-50">Cancel</button>
                      <button onClick={handleSaveTestimonial} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light disabled:opacity-50">
                        <Save size={16} />
                        {saving ? "Saving..." : editingTestimonial ? "Update" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Testimonial Confirmation */}
              {deleteTestimonialConfirm && (
                <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center px-4">
                  <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                    <h3 className="text-lg font-bold text-primary mb-2">Delete Testimonial</h3>
                    <p className="text-sm text-muted mb-6">Are you sure? This action cannot be undone.</p>
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => setDeleteTestimonialConfirm(null)} className="px-4 py-2 text-sm font-medium text-muted border border-neutral-200 rounded-xl hover:bg-neutral-50">Cancel</button>
                      <button onClick={() => handleDeleteTestimonial(deleteTestimonialConfirm)} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonials list */}
              {testimonialsLoading ? (
                <div className="text-center py-20 text-muted">Loading testimonials...</div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <Star size={28} className="text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">No testimonials</h3>
                  <p className="text-sm text-muted mb-6">Add your first customer testimonial.</p>
                  <button onClick={openCreateTestimonial} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl"><Plus size={16} /> Add Testimonial</button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white rounded-2xl border border-neutral-100 p-6 flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                          {t.car && <span className="text-xs text-accent">{t.car}</span>}
                        </div>
                        <p className="text-sm text-muted mb-2 line-clamp-2">&ldquo;{t.text}&rdquo;</p>
                        <p className="text-sm font-medium text-primary">{t.name} {t.role && <span className="text-muted font-normal">&middot; {t.role}</span>}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => openEditTestimonial(t)} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteTestimonialConfirm(t.id)} className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-muted hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== SETTINGS TAB ==================== */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Site Settings</h2>

              {settingsLoading || !settingsForm ? (
                <div className="text-center py-20 text-muted">Loading settings...</div>
              ) : (
                <div className="bg-white rounded-2xl border border-neutral-100 p-6 max-w-2xl space-y-6">
                  <Field label="Phone" value={settingsForm.phone} onChange={(v) => setSettingsForm({ ...settingsForm, phone: v })} placeholder="(555) 000-0000" />
                  <Field label="Email" value={settingsForm.email} onChange={(v) => setSettingsForm({ ...settingsForm, email: v })} placeholder="info@example.com" />
                  <Field label="Address" value={settingsForm.address} onChange={(v) => setSettingsForm({ ...settingsForm, address: v })} placeholder="123 Main St" />
                  <Field label="Hours" value={settingsForm.hours} onChange={(v) => setSettingsForm({ ...settingsForm, hours: v })} placeholder="Mon-Fri 9am-6pm" />

                  <div className="border-t border-neutral-100 pt-6">
                    <h3 className="text-sm font-semibold text-primary mb-4">Social Links</h3>
                    <div className="space-y-4">
                      <Field label="Facebook" value={settingsForm.socialLinks.facebook} onChange={(v) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, facebook: v } })} placeholder="https://facebook.com/..." />
                      <Field label="Instagram" value={settingsForm.socialLinks.instagram} onChange={(v) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, instagram: v } })} placeholder="https://instagram.com/..." />
                      <Field label="Twitter" value={settingsForm.socialLinks.twitter} onChange={(v) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, twitter: v } })} placeholder="https://twitter.com/..." />
                      <Field label="YouTube" value={settingsForm.socialLinks.youtube} onChange={(v) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, youtube: v } })} placeholder="https://youtube.com/..." />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button onClick={handleSaveSettings} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light disabled:opacity-50">
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Settings"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Reusable components ---

function StatusBadge({ status }: { status: string }) {
  const styles = {
    new: "bg-amber-50 text-amber-700",
    contacted: "bg-blue-50 text-blue-700",
    closed: "bg-neutral-100 text-neutral-600",
  };
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || "bg-neutral-100 text-neutral-600"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

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
