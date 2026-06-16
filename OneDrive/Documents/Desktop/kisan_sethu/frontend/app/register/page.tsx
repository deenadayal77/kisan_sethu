"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"farmer" | "buyer">(
    (searchParams.get("role") as "farmer" | "buyer") || "farmer"
  );
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    village: "",
    district: "",
    farm_size_acres: "",
    business_name: "",
    business_type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data: any = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role,
      };

      if (role === "farmer") {
        data.village = formData.village;
        data.district = formData.district;
        if (formData.farm_size_acres) {
          data.farm_size_acres = parseFloat(formData.farm_size_acres);
        }
      } else {
        data.business_name = formData.business_name;
        data.business_type = formData.business_type;
      }

      const user = await register(data);
      router.push(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-card p-8 shadow-card-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Register</h1>
            <p className="text-text-secondary mt-2">Join Kisan Sethu</p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-4 mb-6">
            {(["farmer", "buyer"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-button font-semibold transition-colors ${
                  role === r
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-primary hover:bg-gray-200"
                }`}
              >
                {r === "farmer" ? "🌾 Farmer" : "🛒 Buyer"}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="10-digit phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Farmer Fields */}
            {role === "farmer" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Village
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your village"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your district"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Farm Size (acres) - Optional
                  </label>
                  <input
                    type="number"
                    name="farm_size_acres"
                    value={formData.farm_size_acres}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 2.5"
                  />
                </div>
              </>
            )}

            {/* Buyer Fields */}
            {role === "buyer" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Business Type
                  </label>
                  <select
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    <option value="retailer">Retailer</option>
                    <option value="exporter">Exporter</option>
                    <option value="processor">Processor</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-button font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Registering...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-text-secondary text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <RegisterContent />
    </Suspense>
  );
}
