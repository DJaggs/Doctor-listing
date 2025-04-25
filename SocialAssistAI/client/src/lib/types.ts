export interface Doctor {
  id: number;
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  rating: number;
  ratingCount: number;
  isVideoConsultationAvailable: boolean;
  isInClinicConsultationAvailable: boolean;
  photo?: string;
  introduction?: string;
  languages?: string[];
  clinic?: {
    name: string;
    locality: string;
    city: string;
  };
}

export type ConsultationType = "video" | "clinic" | null;
export type SortOption = "fees" | "experience" | null;

export interface Filters {
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}
