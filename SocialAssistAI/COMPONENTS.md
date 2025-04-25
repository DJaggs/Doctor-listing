# Components and Custom Hooks Guide

This document provides a brief overview of the key components and custom hooks used in the Doctor Listing Application.

## Core Components

### 1. Doctor Card (`components/doctor-card.tsx`)
Displays information about a doctor including their photo, name, specialty, experience, fees, and consultation options.

```tsx
<DoctorCard doctor={doctorObject} />
```

### 2. Doctor List (`components/doctor-list.tsx`)
Renders a list of doctor cards based on filtered data.

```tsx
<DoctorList 
  doctors={filteredDoctors} 
  isLoading={isLoading} 
  filters={filters} 
/>
```

### 3. Search Bar (`components/search-bar.tsx`)
Provides autocomplete search functionality for finding doctors by name.

```tsx
<SearchBar 
  value={searchQuery} 
  onChange={setSearchQuery} 
  onSelectDoctor={handleSelectDoctor} 
  suggestions={suggestions} 
/>
```

### 4. Filter Panel (`components/filter-panel.tsx`)
Contains controls for filtering doctors by specialty, consultation type, and sorting.

```tsx
<FilterPanel 
  filters={filters} 
  specialties={specialties} 
  onChange={handleFilterChange} 
/>
```

## Custom Hooks

### 1. `useDoctors` (`hooks/use-doctors.ts`)
Fetches doctor data from the API and applies filtering, sorting, and search logic.

```tsx
const { 
  doctors,            // All doctors data
  filteredDoctors,    // Doctors after applying filters
  suggestions,        // Search suggestions
  specialties,        // List of unique specialties
  isLoading           // Loading state
} = useDoctors(searchQuery, filters);
```

### 2. `useUrlState` (`hooks/use-url-state.ts`)
Synchronizes state with URL parameters for shareable filters.

```tsx
const [state, setState] = useUrlState({
  consultationType: null,
  specialties: [],
  sortBy: null
});
```

### 3. `useIsMobile` (`hooks/use-mobile.tsx`)
Detects if the user is on a mobile device for responsive designs.

```tsx
const isMobile = useIsMobile();
```

## API Integration

The application fetches doctor data from the backend API endpoint:

```
GET /api/doctors
```

This endpoint returns an array of doctor objects with the following structure:

```typescript
interface Doctor {
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
```