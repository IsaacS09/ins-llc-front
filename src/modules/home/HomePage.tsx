import { Users, Calendar, FileText, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HomeScreenProps {
  onNavigateToPatients: () => void;
}

const HomeScreen = ({ onNavigateToPatients }: HomeScreenProps) => {
  // Mock data - in a real app this would come from an API
  const patientsToday = 12;
  const upcomingAppointments = 8;
  const pendingDocuments = 5;
  const criticalAlerts = 3;

  const cards = [
    {
      title: 'Patients to be seen today',
      count: patientsToday,
      icon: Users,
      description: "Scheduled for today's sessions",
      onClick: onNavigateToPatients,
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
    },
    {
      title: 'Upcoming Appointments',
      count: upcomingAppointments,
      icon: Calendar,
      description: 'Next 24 hours',
      onClick: () => {},
      bgColor: 'bg-medical-header',
      textColor: 'text-primary-foreground',
    },
    {
      title: 'Pending Documents',
      count: pendingDocuments,
      icon: FileText,
      description: 'Awaiting review',
      onClick: () => {},
      bgColor: 'bg-medical-accent',
      textColor: 'text-accent-foreground',
    },
    {
      title: 'Critical Alerts',
      count: criticalAlerts,
      icon: Activity,
      description: 'Require immediate attention',
      onClick: () => {},
      bgColor: 'bg-destructive',
      textColor: 'text-destructive-foreground',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-border"
              onClick={card.onClick}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${card.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${card.textColor}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  {card.count}
                </div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-card-foreground">
                  Patient John Doe checked in
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  10 min ago
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-medical-accent rounded-full"></div>
                <span className="text-sm text-card-foreground">
                  New document uploaded
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  25 min ago
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span className="text-sm text-card-foreground">
                  Critical alert resolved
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  1 hour ago
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="p-3 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={onNavigateToPatients}
              >
                View Patients
              </button>
              <button className="p-3 text-sm bg-medical-header text-primary-foreground rounded-md hover:bg-medical-header/90 transition-colors">
                Schedule
              </button>
              <button className="p-3 text-sm bg-medical-accent text-accent-foreground rounded-md hover:bg-medical-accent/90 transition-colors">
                Documents
              </button>
              <button className="p-3 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                Reports
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
