import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
    { key: 'AM', label: 'AM', bgColor: 'bg-blue-100' },
    { key: 'NN', label: 'NN', bgColor: 'bg-blue-50' },
    { key: 'PM', label: 'PM', bgColor: 'bg-blue-100' },
  ];

  // Get days in selected month
  const year = parseInt(selectedYear);
  const month = parseInt(selectedMonth);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleInputChange = (day: number, shift: string, value: string) => {
    console.log(day, shift, value);
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
    <>
      {/* Month/Year Selection */}
      <Card className="mb-6 gap-3">
        {/* <CardHeader>
          <CardTitle>Select Period</CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="flex flex-row justify-between w-full gap-2">
            <div className="flex-1">
              <div className="flex flex-row gap-3 w-full items-center">
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
                <Button size="sm">Search</Button>
              </div>
            </div>
            <div className="flex">
              {/* <Button size="sm">Save All Data</Button> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Table */}
      <Card className="p-5">
        <CardContent className="p-0">
          <div className="flex flex-row gap-5 items-stretch">
            <div className="w-1/5">
              <div className="border rounded-none p-5 h-full content-center">
                <h3 className="font-bold mb-3"> Medication Name</h3>
                <p> Medication details or instructions</p>
              </div>
            </div>
            <div className="w-4/5">
              <div className="overflow-x-auto">
                <table className="border-collapse border border-border">
                  {/* Header with days */}
                  <thead>
                    <tr>
                      <th className="border border-border p-2 bg-muted font-medium text-left min-w-[50px]">
                        HR.
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
                                handleInputChange(
                                  day,
                                  shift.key,
                                  e.target.value
                                )
                              }
                              className="min-w-[50px] h-8 text-center text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-primary px-1"
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
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardContent className="p-0">
          <div className="flex flex-row gap-5 items-stretch">
            <div className="w-1/5">
              <div className="border rounded-none p-5 h-full content-center">
                <h3 className="font-bold mb-3"> Units Given</h3>
                <p> </p>
              </div>
            </div>
            <div className="w-4/5">
              <div className="overflow-x-auto">
                <table className="border-collapse border border-border">
                  {/* Header with days */}
                  <thead>
                    <tr>
                      <th className="border border-border p-2 bg-muted font-medium text-left min-w-[50px]">
                        HR.
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
                                handleInputChange(
                                  day,
                                  shift.key,
                                  e.target.value
                                )
                              }
                              className="min-w-[50px] h-8 text-center text-sm border-0 bg-transparent focus:bg-white focus:border focus:border-primary px-1"
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
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
