// components/filters/CategoryFilter.tsx
import React from "react";
import { FilterSection } from "./FilterSection";

interface CategoryFilterProps {
  selectedCategories: string[];
  onToggle: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onToggle,
}) => {
  const categories = [
    "Homeopathy",
    "Ayurvedic",
    "Sexual Wellness",
    "Home Care",
    "Veterinary",
    "Baby & Mom Care",
    "Herbal",
    "Supplement",
    "Pet Care",
    "Food",
    "Uncategorized",
    "Beauty",
    "Medicine",
    "Healthcare",
  ];

  return (
    <FilterSection title="Category">
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => onToggle(cat)}
              className="w-3.5 h-3.5 accent-emerald-600 cursor-pointer rounded"
            />
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              {cat}
            </span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};
