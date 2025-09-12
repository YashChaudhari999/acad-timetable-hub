import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { TimetableGrid } from '@/components/timetable/TimetableGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { Calendar, Clock, BookOpen } from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

function FacultyDashboard({ user, onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-card rounded-lg p-6 border shadow-soft">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here's your teaching schedule and upcoming classes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Today's Classes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Next: DBMS at 10:00 AM</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Subjects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>This Week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-sm text-muted-foreground">Total classes</p>
          </CardContent>
        </Card>
      </div>

      <TimetableGrid title="Your Teaching Schedule" />
      
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => onNavigate('timetables')} 
            className="w-full justify-start"
          >
            <Calendar className="mr-2 h-4 w-4" />
            View Full Timetable
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Request Schedule Change
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function HoDDashboard({ user, onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-card rounded-lg p-6 border shadow-soft">
        <h1 className="text-2xl font-bold text-foreground">Department Overview</h1>
        <p className="text-muted-foreground mt-1">
          {user.department} Department - Manage schedules and approve timetables
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Timetables waiting for your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-sm text-muted-foreground">Requires immediate attention</p>
            <Button 
              onClick={() => onNavigate('timetables')} 
              className="mt-4 w-full"
            >
              Review Now
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Department Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Faculty Members</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between">
              <span>Student Batches</span>
              <span className="font-bold">6</span>
            </div>
            <div className="flex justify-between">
              <span>Active Courses</span>
              <span className="font-bold">24</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <TimetableGrid title="Department Timetable Overview" />
    </div>
  );
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  if (user.role === 'admin') {
    return <AdminDashboard onNavigate={onNavigate} />;
  } else if (user.role === 'faculty') {
    return <FacultyDashboard user={user} onNavigate={onNavigate} />;
  } else if (user.role === 'hod') {
    return <HoDDashboard user={user} onNavigate={onNavigate} />;
  }

  return <AdminDashboard onNavigate={onNavigate} />;
}