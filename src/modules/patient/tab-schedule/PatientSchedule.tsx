import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock } from 'lucide-react';
import { format, isSameDay } from 'date-fns';

interface Appointment {
  id: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  location: string;
}

export const PatientSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Mock appointment data
  const appointments: Record<string, Appointment[]> = {
    [format(new Date(), 'yyyy-MM-dd')]: [
      {
        id: 'today-1',
        time: '08:30',
        type: 'Morning Consultation',
        status: 'scheduled',
        location: 'Room 101',
      },
      {
        id: 'today-2',
        time: '10:00',
        type: 'Follow-up Visit',
        status: 'scheduled',
        location: 'Room 102',
      },
      {
        id: 'today-3',
        time: '11:30',
        type: 'Physical Therapy',
        status: 'completed',
        location: 'PT Room',
      },
      {
        id: 'today-4',
        time: '14:00',
        type: 'Surgery Consultation',
        status: 'scheduled',
        location: 'Room 105',
      },
      {
        id: 'today-5',
        time: '15:30',
        type: 'Lab Results Review',
        status: 'scheduled',
        location: 'Room 103',
      },
    ],
    '2025-09-15': [
      {
        id: '1',
        time: '09:00',
        type: 'Consultation',
        status: 'scheduled',
        location: 'Room 101',
      },
      {
        id: '2',
        time: '10:30',
        type: 'Follow-up',
        status: 'scheduled',
        location: 'Room 102',
      },
    ],
    '2025-09-16': [
      {
        id: '3',
        time: '14:00',
        type: 'Surgery',
        status: 'scheduled',
        location: 'OR 1',
      },
    ],
    '2025-09-18': [
      {
        id: '4',
        time: '11:00',
        type: 'Consultation',
        status: 'completed',
        location: 'Room 103',
      },
    ],
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return appointments[dateKey] || [];
  };

  // Get all appointment dates for highlighting
  const appointmentDates = Object.keys(appointments).map(
    (dateStr) => new Date(dateStr)
  );

  // Check if a date has appointments
  const hasAppointments = (date: Date) => {
    return appointmentDates.some((appointmentDate) =>
      isSameDay(date, appointmentDate)
    );
  };

  const selectedDateAppointments = selectedDate
    ? getAppointmentsForDate(selectedDate)
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Large Calendar Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full max-w-none pointer-events-auto"
                modifiers={{
                  hasAppointments: appointmentDates,
                }}
                modifiersStyles={{
                  hasAppointments: {
                    backgroundColor: '#ab1313ff',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                  },
                }}
              />
              <div className="mt-6 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span>Days with appointments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate
                ? format(selectedDate, 'MMM d, yyyy')
                : 'Select a date'}
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length > 0
                ? `${selectedDateAppointments.length} appointment${
                    selectedDateAppointments.length > 1 ? 's' : ''
                  }`
                : 'No appointments'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-3">
                {selectedDateAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1 text-sm text-muted-foreground">
                        <div className="flex gap-2 items-center">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                        </div>
                        <Badge
                          className={getStatusColor(appointment.status)}
                          variant="secondary"
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {appointment.type} • {appointment.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No appointments scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
