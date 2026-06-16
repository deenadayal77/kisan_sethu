import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function getQualityGradeBgColor(grade: string | null) {
  switch (grade) {
    case "A+":
      return "bg-emerald-100";
    case "A":
      return "bg-green-100";
    case "B":
      return "bg-amber-100";
    case "C":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
}

export function getQualityGradeTextColor(grade: string | null) {
  switch (grade) {
    case "A+":
      return "text-emerald-700";
    case "A":
      return "text-green-700";
    case "B":
      return "text-amber-700";
    case "C":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
}

export function getQualityGradeBorderColor(grade: string | null) {
  switch (grade) {
    case "A+":
      return "border-emerald-300";
    case "A":
      return "border-green-300";
    case "B":
      return "border-amber-300";
    case "C":
      return "border-red-300";
    default:
      return "border-gray-300";
  }
}
