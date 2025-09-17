import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Discharged';
}

export const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample patient data - in a real app this would come from a database
  const [patients] = useState<Patient[]>([
    {
      id: 'P001',
      name: 'John Smith',
      dob: '1985-03-15',
      gender: 'Male',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      lastVisit: '2024-09-15',
      status: 'Active',
    },
    {
      id: 'P002',
      name: 'Sarah Johnson',
      dob: '1990-07-22',
      gender: 'Female',
      phone: '(555) 987-6543',
      email: 'sarah.j@email.com',
      lastVisit: '2024-09-14',
      status: 'Active',
    },
    {
      id: 'P003',
      name: 'Michael Brown',
      dob: '1978-11-08',
      gender: 'Male',
      phone: '(555) 456-7890',
      email: 'm.brown@email.com',
      lastVisit: '2024-09-10',
      status: 'Discharged',
    },
    {
      id: 'P004',
      name: 'Emily Davis',
      dob: '1992-05-30',
      gender: 'Female',
      phone: '(555) 321-9876',
      email: 'emily.davis@email.com',
      lastVisit: '2024-08-28',
      status: 'Inactive',
    },
  ]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: Patient['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'secondary';
      case 'Discharged':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleAddNewPatient = () => {
    navigate(`./add-new-patient`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Patient Records
          </h1>
          <p className="text-muted-foreground">
            Manage and view patient information
          </p>
        </div>
        <Button variant="default" onClick={handleAddNewPatient}>
          Add New Patient
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search patients by name, ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patient Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  {new Date(patient.dob).toLocaleDateString()}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(patient.status)}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No patients found matching your search criteria.
        </div>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredPatients.length} of {patients.length} patients
      </div>
    </div>
  );
};
