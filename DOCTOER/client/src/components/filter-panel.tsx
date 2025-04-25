import React from "react";
import { Filters } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterPanelProps {
  filters: Filters;
  specialties: string[];
  onChange: (newFilters: Partial<Filters>) => void;
}

export function FilterPanel({ filters, specialties, onChange }: FilterPanelProps) {
  const handleConsultationChange = (value: string) => {
    onChange({ consultationType: value as "video" | "clinic" | null });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    let newSpecialties = [...filters.specialties];
    
    if (checked) {
      newSpecialties.push(specialty);
    } else {
      newSpecialties = newSpecialties.filter(s => s !== specialty);
    }
    
    onChange({ specialties: newSpecialties });
  };

  const handleSortChange = (value: string) => {
    onChange({ sortBy: value as "fees" | "experience" | null });
  };

  // Map specialties to their testids
  const specialtyTestIdMap: Record<string, string> = {
    'General Physician': 'filter-specialty-General-Physician',
    'Dentist': 'filter-specialty-Dentist',
    'Dermatologist': 'filter-specialty-Dermatologist',
    'Paediatrician': 'filter-specialty-Paediatrician',
    'Gynaecologist': 'filter-specialty-Gynaecologist',
    'ENT': 'filter-specialty-ENT',
    'Diabetologist': 'filter-specialty-Diabetologist',
    'Cardiologist': 'filter-specialty-Cardiologist',
    'Physiotherapist': 'filter-specialty-Physiotherapist',
    'Endocrinologist': 'filter-specialty-Endocrinologist',
    'Orthopaedic': 'filter-specialty-Orthopaedic',
    'Ophthalmologist': 'filter-specialty-Ophthalmologist',
    'Gastroenterologist': 'filter-specialty-Gastroenterologist',
    'Pulmonologist': 'filter-specialty-Pulmonologist',
    'Psychiatrist': 'filter-specialty-Psychiatrist',
    'Urologist': 'filter-specialty-Urologist',
    'Dietitian/Nutritionist': 'filter-specialty-Dietitian-Nutritionist',
    'Psychologist': 'filter-specialty-Psychologist',
    'Sexologist': 'filter-specialty-Sexologist',
    'Nephrologist': 'filter-specialty-Nephrologist',
    'Neurologist': 'filter-specialty-Neurologist',
    'Oncologist': 'filter-specialty-Oncologist',
    'Ayurveda': 'filter-specialty-Ayurveda',
    'Homeopath': 'filter-specialty-Homeopath'
  };

  return (
    <aside className="w-full md:w-1/4 bg-white rounded-lg shadow-sm p-4 h-fit">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700" data-testid="filter-header-moc">Consultation Mode</h3>
        <RadioGroup 
          value={filters.consultationType || ""} 
          onValueChange={handleConsultationChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video-consult" data-testid="filter-video-consult" />
            <Label htmlFor="video-consult" className="cursor-pointer">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="clinic" id="in-clinic" data-testid="filter-in-clinic" />
            <Label htmlFor="in-clinic" className="cursor-pointer">In Clinic</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700" data-testid="filter-header-speciality">Speciality</h3>
        <ScrollArea className="h-60 pr-2">
          <div className="space-y-2">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox 
                  id={`specialty-${specialty}`} 
                  checked={filters.specialties.includes(specialty)} 
                  onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked === true)}
                  data-testid={specialtyTestIdMap[specialty] || `filter-specialty-${specialty.replace(/\s+/g, '-')}`}
                />
                <Label htmlFor={`specialty-${specialty}`} className="cursor-pointer">{specialty}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Sort Filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-700" data-testid="filter-header-sort">Sort By</h3>
        <RadioGroup 
          value={filters.sortBy || ""} 
          onValueChange={handleSortChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
            <Label htmlFor="sort-fees" className="cursor-pointer">Fees (Low to High)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
            <Label htmlFor="sort-experience" className="cursor-pointer">Experience (High to Low)</Label>
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
}
