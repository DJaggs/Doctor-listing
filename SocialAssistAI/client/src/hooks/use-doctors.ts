import { useState, useEffect, useMemo } from "react";
import { Doctor, Filters } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

// Sample data for initial testing
const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    specialty: ["Cardiologist", "General Physician"],
    experience: 15,
    fee: 1500,
    rating: 4.8,
    ratingCount: 120,
    isVideoConsultationAvailable: true,
    isInClinicConsultationAvailable: true
  },
  {
    id: 2,
    name: "Dr. John Davis",
    specialty: ["Dermatologist"],
    experience: 8,
    fee: 1200,
    rating: 4.5,
    ratingCount: 85,
    isVideoConsultationAvailable: true,
    isInClinicConsultationAvailable: false
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    specialty: ["Paediatrician", "General Physician"],
    experience: 12,
    fee: 1800,
    rating: 4.9,
    ratingCount: 150,
    isVideoConsultationAvailable: false,
    isInClinicConsultationAvailable: true
  }
];

const API_URL = "/api/doctors";

export function useDoctors(searchQuery: string, filters: Filters) {
  // Use sample data as fallback during development
  const [fallbackDoctors] = useState<Doctor[]>(SAMPLE_DOCTORS);
  
  // Fetch doctors data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch doctors");
        return response.json() as Promise<Doctor[]>;
      } catch (error) {
        console.error("Error fetching doctors:", error);
        return [] as Doctor[];
      }
    },
  });
  
  // Use fallback data if API fetch fails or returns no data
  const doctors = (data && data.length > 0) ? data : fallbackDoctors;

  // Get unique specialties from all doctors
  const specialties = useMemo(() => {
    if (!doctors || !doctors.length) return [];
    
    const allSpecialties = new Set<string>();
    doctors.forEach(doctor => {
      doctor.specialty.forEach(spec => allSpecialties.add(spec));
    });
    
    return Array.from(allSpecialties).sort();
  }, [doctors]);

  // Apply filters to doctors
  const filteredDoctors = useMemo(() => {
    if (!doctors || !doctors.length) return [];
    
    let result = [...doctors];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply consultation type filter
    if (filters.consultationType) {
      result = result.filter(doctor => {
        if (filters.consultationType === "video") {
          return doctor.isVideoConsultationAvailable;
        } else if (filters.consultationType === "clinic") {
          return doctor.isInClinicConsultationAvailable;
        }
        return true;
      });
    }
    
    // Apply specialty filters
    if (filters.specialties.length > 0) {
      result = result.filter(doctor => 
        filters.specialties.some(specialty => 
          doctor.specialty.includes(specialty)
        )
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === "fees") {
          return a.fee - b.fee; // Ascending
        } else if (filters.sortBy === "experience") {
          return b.experience - a.experience; // Descending
        }
        return 0;
      });
    }
    
    return result;
  }, [doctors, searchQuery, filters]);

  // Get suggestions for autocomplete
  const suggestions = useMemo(() => {
    if (!searchQuery || !doctors || !doctors.length) return [];
    
    return doctors
      .filter(doctor => doctor.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3); // Only return top 3 matches
  }, [doctors, searchQuery]);

  return {
    doctors,
    filteredDoctors,
    suggestions,
    specialties,
    isLoading,
  };
}
