// Type definitions for the Smart Classroom & Timetable System

export type UserRole = 'admin' | 'faculty' | 'hod';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  type: 'lecture' | 'lab';
  equipment?: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  classesPerWeek: number;
  maxClassesPerDay: number;
  credits: number;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  maxClassesPerDay: number;
  availability: TimeSlot[];
}

export interface Batch {
  id: string;
  name: string;
  department: string;
  semester: number;
  strength: number;
}

export interface TimeSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
}

export interface TimetableEntry {
  id: string;
  batchId: string;
  classroomId: string;
  subjectId: string;
  facultyId: string;
  timeSlot: TimeSlot;
  status: 'draft' | 'review' | 'approved';
}

export interface Timetable {
  id: string;
  name: string;
  academicYear: string;
  semester: number;
  entries: TimetableEntry[];
  createdBy: string;
  createdAt: Date;
  status: 'draft' | 'review' | 'approved';
}

export interface DashboardStats {
  totalClassrooms: number;
  totalFaculty: number;
  totalSubjects: number;
  totalBatches: number;
  activeTimetables: number;
  utilizationRate: number;
}

export interface TimetableConflict {
  type: 'faculty_double_booked' | 'classroom_double_booked' | 'batch_overloaded';
  message: string;
  entries: TimetableEntry[];
  suggestions?: string[];
}