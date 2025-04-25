import React, { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { FilterPanel } from "@/components/filter-panel";
import { DoctorList } from "@/components/doctor-list";
import { Filters, Doctor } from "@/lib/types";
import { useDoctors } from "@/hooks/use-doctors";
import { useUrlState } from "@/hooks/use-url-state";

export default function Home() {
  // Initialize URL state with defaults
  const [urlParams, setUrlParams] = useUrlState<{
    search: string;
    consultationType: "video" | "clinic" | null;
    specialties: string[];
    sortBy: "fees" | "experience" | null;
  }>({
    search: "",
    consultationType: null,
    specialties: [],
    sortBy: null,
  });
  
  // Set up filter state from URL
  const [searchQuery, setSearchQuery] = useState(urlParams.search || "");
  const filters: Filters = {
    consultationType: urlParams.consultationType || null,
    specialties: Array.isArray(urlParams.specialties) ? urlParams.specialties : [],
    sortBy: urlParams.sortBy || null,
  };
  
  // Get doctors with current filters applied
  const { filteredDoctors, suggestions, specialties, isLoading } = useDoctors(searchQuery, filters);
  
  // Handlers for search and filter changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setUrlParams({ search: value });
  };
  
  const handleSelectDoctor = (doctor: Doctor) => {
    setSearchQuery(doctor.name);
    setUrlParams({ search: doctor.name });
  };
  
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setUrlParams(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-primary flex items-center">
              <i className="fas fa-stethoscope mr-2"></i>
              <span>MediFinder</span>
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-1/2">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onSelectDoctor={handleSelectDoctor}
              suggestions={suggestions}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <FilterPanel 
            filters={filters} 
            specialties={specialties}
            onChange={handleFilterChange}
          />
          
          {/* Results Area */}
          <DoctorList 
            doctors={filteredDoctors} 
            isLoading={isLoading}
            filters={filters}
          />
        </div>
      </main>
    </div>
  );
}
