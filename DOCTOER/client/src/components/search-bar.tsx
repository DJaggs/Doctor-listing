import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Doctor } from "@/lib/types";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  suggestions: Doctor[];
}

export function SearchBar({ value, onChange, onSelectDoctor, suggestions }: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length > 0);
  };
  
  const handleSelectSuggestion = (doctor: Doctor) => {
    onSelectDoctor(doctor);
    setShowSuggestions(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <div className="relative">
        <Input
          type="text"
          data-testid="autocomplete-input"
          placeholder="Search for doctors by name..."
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(value.length > 0)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button className="absolute right-3 top-2.5 text-gray-400">
          <i className="fas fa-search"></i>
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
              data-testid="suggestion-item"
              onClick={() => handleSelectSuggestion(doctor)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span>{doctor.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
