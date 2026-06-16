"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ onImagesChange, maxFiles = 3 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const validFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const newPreviews = validFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles([...files, ...validFiles]);
    setPreviews([...previews, ...newPreviews]);
    onImagesChange([...files, ...validFiles]);
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    setFiles(newFiles);
    onImagesChange(newFiles);
  };

  const canAddMore = files.length < maxFiles;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canAddMore && (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-card p-8 text-center cursor-pointer hover:border-primary hover:bg-primary-light transition-colors"
        >
          <Upload className="mx-auto mb-3 text-text-secondary" size={32} />
          <p className="font-medium text-text-primary">Click to upload images</p>
          <p className="text-sm text-text-secondary mt-1">
            or drag and drop ({files.length}/{maxFiles})
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className={cn(
                  "absolute top-2 right-2 p-1.5 bg-error text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                )}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
