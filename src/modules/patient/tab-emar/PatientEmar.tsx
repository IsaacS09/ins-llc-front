import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PatientEmar = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [medicalRecords, setMedicalRecords] = useState<Record<string, string>>(
    {}
  );

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const shifts = [
    { key: 'AM', label: 'AM', bgColor: 'bg-blue-50' },
    { key: 'NN', label: 'NN', bgColor: 'bg-purple-50' },
    { key: 'PM', label: 'PM', bgColor: 'bg-orange-50' },
  ];

  // Get days in selected month
  const year = parseInt(selectedYear);
  const month = parseInt(selectedMonth);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleInputChange = (day: number, shift: string, value: string) => {
    const key = `${year}-${month}-${day}-${shift}`;
    setMedicalRecords((prev) => ({
      ...prev,
      [key]: value.toUpperCase(),
    }));
  };

  const getInputValue = (day: number, shift: string) => {
    const key = `${year}-${month}-${day}-${shift}`;
    return medicalRecords[key] || '';
  };

  return (
    <div className="container mx-auto p-6">
      {/* Month/Year Selection */}
      <Card className="mb-6 gap-3">
        {/* <CardHeader>
          <CardTitle>Select Period</CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="flex flex-row justify-between w-full gap-2">
            <div className="flex-1">
              <div className="flex flex-row gap-3 w-full">
                <Label htmlFor="month-select">Month</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label htmlFor="year-select">Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025, 2026].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex">
              <Button size="sm">Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Calendario de Turnos - {months[month]} {year}
          </CardTitle>
          <CardDescription>
            Ingrese las iniciales del médico responsable en cada turno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              {/* Header with days */}
              <thead>
                <tr>
                  <th className="border border-border p-2 bg-muted font-medium text-left min-w-[100px]">
                    Turno
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="border border-border p-2 bg-muted font-medium text-center min-w-[50px]"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.key} className={shift.bgColor}>
                    <td className="border border-border p-2 font-medium">
                      {shift.label}
                    </td>
                    {days.map((day) => (
                      <td
                        key={`${shift.key}-${day}`}
                        className="border border-border p-1"
                      >
                        <Input
                          value={getInputValue(day, shift.key)}
                          onChange={(e) =>
                            handleInputChange(day, shift.key, e.target.value)
                          }
                          className="w-full h-8 text-center text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-primary"
                          placeholder="---"
                          maxLength={3}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end items-center">
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
