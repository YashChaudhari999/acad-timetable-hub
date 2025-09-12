import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { weekDays, timeSlots } from '@/lib/mockData';
import { TimetableEntry } from '@/lib/types';
import { Clock, MapPin, User, BookOpen } from 'lucide-react';

interface TimetableGridProps {
  entries?: TimetableEntry[];
  title?: string;
  editable?: boolean;
  onEntryClick?: (entry: TimetableEntry) => void;
}

// Mock timetable data for demonstration
const mockEntries: TimetableEntry[] = [
  {
    id: '1',
    batchId: 'batch1',
    classroomId: 'cr1',
    subjectId: 'sub1',
    facultyId: 'fac1',
    timeSlot: {
      day: 'monday',
      startTime: '09:00',
      endTime: '10:00'
    },
    status: 'approved'
  },
  {
    id: '2',
    batchId: 'batch1',
    classroomId: 'cr2',
    subjectId: 'sub2',
    facultyId: 'fac2',
    timeSlot: {
      day: 'monday',
      startTime: '10:00',
      endTime: '11:00'
    },
    status: 'approved'
  },
  {
    id: '3',
    batchId: 'batch1',
    classroomId: 'cr1',
    subjectId: 'sub3',
    facultyId: 'fac1',
    timeSlot: {
      day: 'tuesday',
      startTime: '09:00',
      endTime: '10:00'
    },
    status: 'review'
  },
  {
    id: '4',
    batchId: 'batch1',
    classroomId: 'cr3',
    subjectId: 'sub4',
    facultyId: 'fac2',
    timeSlot: {
      day: 'wednesday',
      startTime: '11:15',
      endTime: '12:15'
    },
    status: 'draft'
  }
];

export function TimetableGrid({ 
  entries = mockEntries, 
  title = "Weekly Timetable - CS-3A", 
  editable = false,
  onEntryClick 
}: TimetableGridProps) {
  
  const getEntryForSlot = (day: string, timeSlot: string) => {
    return entries.find(entry => 
      entry.timeSlot.day === day && 
      `${entry.timeSlot.startTime}-${entry.timeSlot.endTime}` === timeSlot
    );
  };

  const getSubjectName = (subjectId: string) => {
    const subjects: Record<string, string> = {
      'sub1': 'Data Structures',
      'sub2': 'DBMS',
      'sub3': 'Machine Learning',
      'sub4': 'Software Engineering'
    };
    return subjects[subjectId] || 'Unknown Subject';
  };

  const getFacultyName = (facultyId: string) => {
    const faculty: Record<string, string> = {
      'fac1': 'Dr. Johnson',
      'fac2': 'Prof. Chen',
      'fac3': 'Dr. Davis'
    };
    return faculty[facultyId] || 'Unknown Faculty';
  };

  const getRoomName = (classroomId: string) => {
    const rooms: Record<string, string> = {
      'cr1': 'Room A-101',
      'cr2': 'Lab B-201',
      'cr3': 'Room A-102',
      'cr4': 'Lab C-301'
    };
    return rooms[classroomId] || 'Unknown Room';
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Badge variant="outline" className="text-xs">
            Academic Year 2024-25
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-border p-3 bg-muted text-left font-medium min-w-[100px]">
                  Time
                </th>
                {weekDays.map(day => (
                  <th key={day.value} className="border border-border p-3 bg-muted text-center font-medium min-w-[160px]">
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot.value} className="hover:bg-accent/50">
                  <td className="border border-border p-3 bg-muted/30 font-medium text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{slot.label}</span>
                    </div>
                  </td>
                  {weekDays.map(day => {
                    const entry = getEntryForSlot(day.value, slot.value);
                    
                    return (
                      <td key={`${day.value}-${slot.value}`} className="border border-border p-2">
                        {entry ? (
                          <div 
                            className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
                              entry.status === 'approved' 
                                ? 'bg-success-light border-success hover:bg-success-light/80' 
                                : entry.status === 'review'
                                ? 'bg-warning-light border-warning hover:bg-warning-light/80'
                                : 'bg-accent border-border hover:bg-accent/80'
                            }`}
                            onClick={() => onEntryClick?.(entry)}
                          >
                            <div className="space-y-1">
                              <div className="font-semibold text-sm text-foreground">
                                {getSubjectName(entry.subjectId)}
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{getFacultyName(entry.facultyId)}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{getRoomName(entry.classroomId)}</span>
                              </div>
                              <Badge 
                                variant={
                                  entry.status === 'approved' ? 'default' :
                                  entry.status === 'review' ? 'secondary' :
                                  'outline'
                                }
                                className="text-xs"
                              >
                                {entry.status}
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="h-20 flex items-center justify-center text-muted-foreground">
                            {editable ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs h-8"
                              >
                                Add Class
                              </Button>
                            ) : (
                              <span className="text-xs">Free</span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success border border-success rounded"></div>
            <span>Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning border border-warning rounded"></div>
            <span>Under Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent border border-border rounded"></div>
            <span>Draft</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}