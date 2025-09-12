import { StatsCard } from './StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { mockDashboardStats, mockTimetables } from '@/lib/mockData';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-card rounded-lg p-6 border shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage timetables, classrooms, and academic resources efficiently
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="bg-primary/10 rounded-full p-3">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Classrooms"
          value={stats.totalClassrooms}
          description="Available rooms & labs"
          icon={Building}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Faculty Members"
          value={stats.totalFaculty}
          description="Active teaching staff"
          icon={Users}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatsCard
          title="Subjects"
          value={stats.totalSubjects}
          description="Total courses"
          icon={BookOpen}
        />
        <StatsCard
          title="Student Batches"
          value={stats.totalBatches}
          description="Active class groups"
          icon={GraduationCap}
        />
      </div>

      {/* Utilization and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Classroom Utilization */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Classroom Utilization</span>
            </CardTitle>
            <CardDescription>
              Current utilization rate across all facilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Utilization</span>
                <span className="font-medium">{stats.utilizationRate}%</span>
              </div>
              <Progress value={stats.utilizationRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Peak Hours</div>
                <div className="font-medium">10:00 - 14:00</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Available Now</div>
                <div className="font-medium text-success">12 Rooms</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => onNavigate('generator')} 
              className="w-full justify-start h-12"
            >
              <Clock className="mr-3 h-4 w-4" />
              Generate New Timetable
            </Button>
            <Button 
              onClick={() => onNavigate('data')} 
              variant="outline" 
              className="w-full justify-start h-12"
            >
              <BookOpen className="mr-3 h-4 w-4" />
              Manage Academic Data
            </Button>
            <Button 
              onClick={() => onNavigate('classrooms')} 
              variant="outline" 
              className="w-full justify-start h-12"
            >
              <Building className="mr-3 h-4 w-4" />
              Manage Classrooms
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Timetables */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Recent Timetables</span>
          </CardTitle>
          <CardDescription>
            Latest timetable activities and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTimetables.map((timetable) => (
              <div key={timetable.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{timetable.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {timetable.academicYear} • Semester {timetable.semester}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={
                      timetable.status === 'approved' ? 'default' : 
                      timetable.status === 'review' ? 'secondary' : 
                      'outline'
                    }
                    className={
                      timetable.status === 'approved' ? 'bg-success text-success-foreground' :
                      timetable.status === 'review' ? 'bg-warning text-warning-foreground' :
                      ''
                    }
                  >
                    {timetable.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {timetable.status === 'review' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {timetable.status === 'draft' && <Clock className="w-3 h-3 mr-1" />}
                    {timetable.status.charAt(0).toUpperCase() + timetable.status.slice(1)}
                  </Badge>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onNavigate('timetables')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button 
              onClick={() => onNavigate('timetables')} 
              variant="outline" 
              className="w-full"
            >
              View All Timetables
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}