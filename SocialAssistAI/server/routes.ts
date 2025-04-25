import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from 'fs/promises';
import path from 'path';

// Sample doctors data as fallback
const sampleDoctors = [
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
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Real doctors data endpoint with data from file
  app.get("/api/doctors", async (_req: Request, res: Response) => {
    try {
      // Prepare the path to the doctors.json file
      const currentDir = process.cwd();
      const doctorsDataPath = path.join(currentDir, 'server', 'data', 'doctors.json');
      
      // Read and parse the JSON file
      const doctorsData = await fs.readFile(doctorsDataPath, 'utf8');
      const doctors = JSON.parse(doctorsData);
      
      // Map and ensure the data structure is consistent with our Doctor type
      const mappedDoctors = doctors.map((doctor: any) => ({
        id: Number(doctor.id),  // Ensure id is a number
        name: doctor.name,
        specialty: doctor.specialty || 
          (doctor.specialities ? doctor.specialities.map((s: any) => s.name) : []),
        experience: typeof doctor.experience === 'string' ? 
          parseInt(doctor.experience.replace(/[^\d]/g, '')) : doctor.experience,
        fee: typeof doctor.fee === 'string' ? 
          parseInt(doctor.fee.replace(/[^\d]/g, '')) : doctor.fee,
        rating: doctor.rating || 4.5, // Default rating if not available
        ratingCount: doctor.ratingCount || 100, // Default ratingCount if not available
        isVideoConsultationAvailable: doctor.isVideoConsultationAvailable || 
          doctor.video_consult || false,
        isInClinicConsultationAvailable: doctor.isInClinicConsultationAvailable || 
          doctor.in_clinic || false,
        photo: doctor.photo || '',
        introduction: doctor.introduction || doctor.doctor_introduction || '',
        languages: doctor.languages || [],
        clinic: doctor.clinic ? {
          name: doctor.clinic.name || '',
          locality: doctor.clinic.locality || 
            (doctor.clinic.address ? doctor.clinic.address.locality : ''),
          city: doctor.clinic.city || 
            (doctor.clinic.address ? doctor.clinic.address.city : '')
        } : undefined
      }));
      
      res.json(mappedDoctors);
    } catch (error) {
      console.error('Error loading doctors data:', error);
      res.status(500).json({ error: 'Failed to load doctors data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
