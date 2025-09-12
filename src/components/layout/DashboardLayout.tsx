import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/lib/types';
import { 
  GraduationCap, 
  Menu, 
  X, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut,
  Building,
  Clock,
  FileSpreadsheet
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function DashboardLayout({ 
  children, 
  user, 
  currentPage, 
  onPageChange, 
  onLogout 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'faculty', 'hod']
    },
    {
      name: 'Timetable Generator',
      id: 'generator',
      icon: Clock,
      roles: ['admin']
    },
    {
      name: 'View Timetables',
      id: 'timetables',
      icon: Calendar,
      roles: ['admin', 'faculty', 'hod']
    },
    {
      name: 'Manage Data',
      id: 'data',
      icon: BookOpen,
      roles: ['admin']
    },
    {
      name: 'Classrooms',
      id: 'classrooms',
      icon: Building,
      roles: ['admin', 'hod']
    },
    {
      name: 'Faculty',
      id: 'faculty',
      icon: Users,
      roles: ['admin', 'hod']
    },
    {
      name: 'Export',
      id: 'export',
      icon: FileSpreadsheet,
      roles: ['admin', 'hod']
    },
    {
      name: 'Settings',
      id: 'settings',
      icon: Settings,
      roles: ['admin']
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-header transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 bg-primary text-primary-foreground">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-lg font-semibold">Smart Classroom</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-primary-foreground hover:bg-primary-hover"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 bg-primary/95 text-primary-foreground">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs opacity-80 capitalize">{user.role}</div>
            {user.department && (
              <div className="text-xs opacity-60">{user.department}</div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 bg-primary text-primary-foreground">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    currentPage === item.id
                      ? "bg-primary-foreground text-primary"
                      : "text-primary-foreground/80 hover:bg-primary-hover hover:text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 bg-primary border-t border-primary-hover">
            <Button
              onClick={onLogout}
              variant="ghost"
              className="w-full justify-start text-primary-foreground hover:bg-primary-hover"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-0">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 shadow-soft lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-foreground capitalize">
              {navigation.find(n => n.id === currentPage)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}