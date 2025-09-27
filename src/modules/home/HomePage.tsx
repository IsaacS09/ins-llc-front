import { Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigation = useNavigate();

  const patientsToday = 12;
  const upcomingAppointments = 8;

  const cards = [
    {
      title: 'Patients to be seen today',
      count: patientsToday,
      icon: Users,
      description: "Scheduled for today's sessions",
      onClick: () => navigation('/admin/patients'),
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
    },
    {
      title: 'Upcoming Appointments',
      count: upcomingAppointments,
      icon: Calendar,
      description: 'Next 24 hours',
      onClick: () => {},
      bgColor: 'bg-slate-600',
      textColor: 'text-primary-foreground',
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
    </div>
  );
};
