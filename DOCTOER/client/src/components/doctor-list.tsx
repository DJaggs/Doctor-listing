import React from "react";
import { Doctor, Filters } from "@/lib/types";
import { DoctorCard } from "@/components/doctor-card";

interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
  filters: Filters;
}

export function DoctorList({ doctors, isLoading, filters }: DoctorListProps) {
  // Generate applied filters text
  const getAppliedFiltersText = () => {
    const appliedFiltersArray = [];
    
    if (filters.consultationType) {
      appliedFiltersArray.push(filters.consultationType === "video" ? "Video Consult" : "In Clinic");
    }
    
    if (filters.specialties.length > 0) {
      appliedFiltersArray.push(...filters.specialties);
    }
    
    if (filters.sortBy) {
      appliedFiltersArray.push(`Sorted by ${filters.sortBy === "fees" ? "Fees" : "Experience"}`);
    }
    
    return appliedFiltersArray.length > 0 
      ? appliedFiltersArray.join(", ") 
      : "None";
  };

  return (
    <section className="w-full md:w-3/4">
      {/* Results Summary */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          <span>{doctors.length}</span> Doctors found
        </h2>
        <div className="text-sm text-gray-500">
          Applied Filters: <span>{getAppliedFiltersText()}</span>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      )}
      
      {/* No Results State */}
      {!isLoading && doctors.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
          <p className="text-gray-600 text-center">Try adjusting your filters or search criteria</p>
        </div>
      )}
      
      {/* Doctor Cards */}
      {!isLoading && doctors.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </section>
  );
}
