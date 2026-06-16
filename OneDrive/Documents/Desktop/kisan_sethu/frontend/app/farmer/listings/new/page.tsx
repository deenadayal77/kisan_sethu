"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { ImageUpload } from "@/components/listing/ImageUpload";
import { QualityBadge } from "@/components/listing/QualityBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Zap, ArrowRight } from "lucide-react";
import type { QualityGrade } from "@/types";

const CATEGORIES = ["fruit", "vegetable", "grain", "spice"];

export default function CreateListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [grading, setGrading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [qualityResult, setQualityResult] = useState<QualityGrade | null>(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    crop_name: "",
    crop_category: "",
    variety: "",
    quantity_kg: "",
    min_price_per_kg: "",
    description: "",
    harvest_date: "",
    location: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGradeWithAI = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    setGrading(true);
    setError("");

    try {
      // Upload image first
      const uploadRes = await api.uploadListingImage(0, images[0]);
      // For now, we'll mock the grading response
      // In real app, this would call the backend grading endpoint
      const mockResult: QualityGrade = {
        grade: ["A+", "A", "B", "C"][Math.floor(Math.random() * 4)] as any,
        score: Math.floor(Math.random() * 40 + 60),
        shelf_life_days: Math.floor(Math.random() * 7 + 3),
        notes: "Good color uniformity with minor surface marks. Fresh appearance maintained.",
        defects: [],
      };
      setQualityResult(mockResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to grade image");
    } finally {
      setGrading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = {
        ...formData,
        quantity_kg: parseFloat(formData.quantity_kg),
        min_price_per_kg: parseFloat(formData.min_price_per_kg),
        images: [], // Will be populated after upload
        quality_grade: qualityResult?.grade || null,
        quality_score: qualityResult?.score || null,
        shelf_life_days: qualityResult?.shelf_life_days || null,
        quality_notes: qualityResult?.notes || null,
        status: "live",
      };

      await api.createListing(data);
      router.push("/farmer/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Create New Listing</h1>
      <p className="text-text-secondary mb-8">
        Add your fresh produce to the marketplace
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-surface border border-border rounded-card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Crop Name *
              </label>
              <input
                type="text"
                name="crop_name"
                value={formData.crop_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Tomato"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category *
              </label>
              <select
                name="crop_category"
                value={formData.crop_category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Variety
              </label>
              <input
                type="text"
                name="variety"
                value={formData.variety}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Hybrid F1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Quantity (kg) *
              </label>
              <input
                type="number"
                name="quantity_kg"
                value={formData.quantity_kg}
                onChange={handleInputChange}
                required
                step="0.1"
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Minimum Price (₹/kg) *
              </label>
              <input
                type="number"
                name="min_price_per_kg"
                value={formData.min_price_per_kg}
                onChange={handleInputChange}
                required
                step="0.1"
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Harvest Date
              </label>
              <input
                type="date"
                name="harvest_date"
                value={formData.harvest_date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Village, District"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your produce..."
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-surface border border-border rounded-card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Upload Images
          </h2>
          <ImageUpload onImagesChange={setImages} maxFiles={3} />
        </div>

        {/* AI Grading */}
        {images.length > 0 && (
          <div className="bg-surface border border-border rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              AI Quality Grading
            </h2>

            {qualityResult ? (
              <div className="space-y-4">
                <div className="bg-primary-light rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-text-secondary">Quality Grade</p>
                      <QualityBadge grade={qualityResult.grade} score={qualityResult.score} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-text-secondary">Score</p>
                      <p className="text-2xl font-bold text-primary">
                        {qualityResult.score}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Shelf Life</p>
                      <p className="text-2xl font-bold text-primary">
                        {qualityResult.shelf_life_days} days
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary italic">
                    "{qualityResult.notes}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setQualityResult(null)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Re-grade
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGradeWithAI}
                disabled={grading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-button font-semibold hover:bg-accent/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {grading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Grade with AI
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-button font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Publishing...
              </>
            ) : (
              <>
                Publish Listing
                <ArrowRight size={20} />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-border text-text-primary rounded-button font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
