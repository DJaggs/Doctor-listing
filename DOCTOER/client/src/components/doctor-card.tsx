import React from "react";
import { Doctor } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100" data-testid="doctor-card">
      <div className="p-4 flex flex-col sm:flex-row">
        {/* Doctor Image */}
        <div className="sm:mr-4 mb-4 sm:mb-0 flex-shrink-0">
          {doctor.photo ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder on image load error
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`;
                }}
              />
            </div>
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </div>
        
        {/* Doctor Details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
            <h3 className="text-lg font-semibold mb-1 sm:mb-0" data-testid="doctor-name">{doctor.name}</h3>
            <div className="flex items-center space-x-2">
              {doctor.isVideoConsultationAvailable && (
                <Badge variant="outline" className="bg-primary bg-opacity-10 text-primary">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 10L19.5528 7.72361C19.8343 7.58284 20 7.30689 20 7V17C20 17.3069 19.8343 17.5828 19.5528 17.7236L15 20V10Z" fill="currentColor"/>
                    <rect x="3" y="5" width="12" height="14" rx="2" fill="currentColor"/>
                  </svg>
                  Video Consult
                </Badge>
              )}
              {doctor.isInClinicConsultationAvailable && (
                <Badge variant="outline" className="bg-accent bg-opacity-10 text-accent">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="currentColor"/>
                    <path d="M9 22V12H15V22" fill="currentColor"/>
                  </svg>
                  In Clinic
                </Badge>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600" data-testid="doctor-specialty">{doctor.specialty.join(', ')}</p>
            {doctor.clinic && (
              <p className="text-xs text-gray-500 mt-1">
                {doctor.clinic.name}, {doctor.clinic.locality}, {doctor.clinic.city}
              </p>
            )}
          </div>
          
          {doctor.introduction && (
            <div className="mb-3">
              <p className="text-xs text-gray-600 line-clamp-2">{doctor.introduction}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center" data-testid="doctor-experience">
              <svg className="w-4 h-4 text-gray-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm"><span className="font-medium">{doctor.experience}</span> Years Exp</span>
            </div>
            <div className="flex items-center" data-testid="doctor-fee">
              <svg className="w-4 h-4 text-gray-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm"><span className="font-medium">₹{doctor.fee}</span> Consultation</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center bg-secondary bg-opacity-10 text-secondary text-xs px-2 py-1 rounded-full mr-2">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{doctor.rating}</span>
              </div>
              <span className="text-xs text-gray-500">{doctor.ratingCount}+ ratings</span>
            </div>

            {doctor.languages && doctor.languages.length > 0 && (
              <div className="text-xs text-gray-500 mt-1 mb-2 sm:mb-0">
                Speaks: {doctor.languages.slice(0, 2).join(', ')}
                {doctor.languages.length > 2 && '...'}
              </div>
            )}
            
            <button className="px-4 py-1 rounded bg-primary text-white text-sm hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
