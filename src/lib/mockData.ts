import { User, Classroom, Subject, Faculty, Batch, Timetable, DashboardStats } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@main',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'faculty',
    department: 'Computer Science'
  },
  {
    id: '3',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    role: 'hod',
    department: 'Computer Science'
  }
];

// Mock Classrooms
export const mockClassrooms: Classroom[] = [
  {
    id: 'cr1',
    name: 'Room A-101',
    capacity: 60,
    type: 'lecture',
    equipment: ['Projector', 'Whiteboard', 'Audio System']
  },
  {
    id: 'cr2',
    name: 'Lab B-201',
    capacity: 30,
    type: 'lab',
    equipment: ['Computers', 'Projector', 'Network Access']
  },
  {
    id: 'cr3',
    name: 'Room A-102',
    capacity: 80,
    type: 'lecture',
    equipment: ['Smart Board', 'Audio System', 'Air Conditioning']
  },
  {
    id: 'cr4',
    name: 'Lab C-301',
    capacity: 25,
    type: 'lab',
    equipment: ['Computers', 'Software Licenses', 'Projector']
  }
];

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    id: 'sub1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    department: 'Computer Science',
    classesPerWeek: 4,
    maxClassesPerDay: 2,
    credits: 3
  },
  {
    id: 'sub2',
    name: 'Database Management Systems',
    code: 'CS302',
    department: 'Computer Science',
    classesPerWeek: 3,
    maxClassesPerDay: 1,
    credits: 3
  },
  {
    id: 'sub3',
    name: 'Machine Learning',
    code: 'CS401',
    department: 'Computer Science',
    classesPerWeek: 3,
    maxClassesPerDay: 2,
    credits: 4
  },
  {
    id: 'sub4',
    name: 'Software Engineering',
    code: 'CS303',
    department: 'Computer Science',
    classesPerWeek: 4,
    maxClassesPerDay: 2,
    credits: 3
  }
];

// Mock Faculty
export const mockFaculty: Faculty[] = [
  {
    id: 'fac1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    subjects: ['sub1', 'sub2'],
    maxClassesPerDay: 4,
    availability: []
  },
  {
    id: 'fac2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    subjects: ['sub3', 'sub4'],
    maxClassesPerDay: 3,
    availability: []
  },
  {
    id: 'fac3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@university.edu',
    subjects: ['sub2', 'sub3'],
    maxClassesPerDay: 4,
    availability: []
  }
];

// Mock Batches
export const mockBatches: Batch[] = [
  {
    id: 'batch1',
    name: 'CS-3A',
    department: 'Computer Science',
    semester: 5,
    strength: 45
  },
  {
    id: 'batch2',
    name: 'CS-3B',
    department: 'Computer Science',
    semester: 5,
    strength: 42
  },
  {
    id: 'batch3',
    name: 'CS-4A',
    department: 'Computer Science',
    semester: 7,
    strength: 38
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalClassrooms: mockClassrooms.length,
  totalFaculty: mockFaculty.length,
  totalSubjects: mockSubjects.length,
  totalBatches: mockBatches.length,
  activeTimetables: 3,
  utilizationRate: 78.5
};

// Mock Timetables
export const mockTimetables: Timetable[] = [
  {
    id: 'tt1',
    name: 'CS Department - Semester 5',
    academicYear: '2024-25',
    semester: 5,
    entries: [],
    createdBy: 'admin@main',
    createdAt: new Date('2024-01-15'),
    status: 'approved'
  },
  {
    id: 'tt2',
    name: 'CS Department - Semester 7',
    academicYear: '2024-25',
    semester: 7,
    entries: [],
    createdBy: 'admin@main',
    createdAt: new Date('2024-01-16'),
    status: 'review'
  },
  {
    id: 'tt3',
    name: 'Draft - All Batches',
    academicYear: '2024-25',
    semester: 5,
    entries: [],
    createdBy: 'admin@main',
    createdAt: new Date('2024-01-17'),
    status: 'draft'
  }
];

// Time slots configuration
export const timeSlots = [
  { label: '9:00 - 10:00', value: '09:00-10:00' },
  { label: '10:00 - 11:00', value: '10:00-11:00' },
  { label: '11:15 - 12:15', value: '11:15-12:15' },
  { label: '12:15 - 13:15', value: '12:15-13:15' },
  { label: '14:15 - 15:15', value: '14:15-15:15' },
  { label: '15:15 - 16:15', value: '15:15-16:15' },
  { label: '16:30 - 17:30', value: '16:30-17:30' }
];

export const weekDays = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' }
];