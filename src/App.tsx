import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import TimetableGenerator from './pages/TimetableGenerator';
import { TimetableGrid } from '@/components/timetable/TimetableGrid';
import { User } from '@/lib/types';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    if (!currentUser) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={currentUser} onNavigate={setCurrentPage} />;
      case 'generator':
        return <TimetableGenerator />;
      case 'timetables':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-card rounded-lg p-6 border shadow-soft">
              <h1 className="text-2xl font-bold text-foreground">Timetables</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all timetables
              </p>
            </div>
            <TimetableGrid />
          </div>
        );
      case 'data':
      case 'classrooms':
      case 'faculty':
      case 'export':
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-card rounded-lg p-6 border shadow-soft">
              <h1 className="text-2xl font-bold text-foreground capitalize">{currentPage}</h1>
              <p className="text-muted-foreground mt-1">
                This section is under development
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard user={currentUser} onNavigate={setCurrentPage} />;
    }
  };

  if (!currentUser) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginForm onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DashboardLayout
          user={currentUser}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        >
          {renderPage()}
        </DashboardLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
