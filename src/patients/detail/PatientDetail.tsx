import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MedicalTreatment } from '@/interfaces/medical-treatment.interface';
import type { Patient, UpdatePatient } from '@/interfaces/patient.interface';

interface Props {
  patientId: string;
}

export const PatientDetail = ({ patientId }: Props) => {
  const [editingPatient, setEditingPatient] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<string | null>(null);

  // Mock patient data - replace with actual data fetching
  const [patient, setPatient] = useState<Patient>({
    id: patientId,
    name: 'John Doe',
    status: 'Active',
    age: 30,
    supervisor: 'John Walker',
    gender: 'Male',
    notes: 'this is a note',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    photo: 'https://isaacs09.github.io/ins-llc-front/placeholder.svg',
    lastVisit: '2024-01-14',
    medicalTreatments: [
      {
        id: '1',
        medication: 'Lisinopril 10mg',
        frequency: 'Once daily',
        indication: 'Hypertension',
        status: 'Active',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
      },
      {
        id: '2',
        medication: 'Metformin 500mg',
        frequency: 'Twice daily',
        indication: 'Type 2 Diabetes',
        status: 'Active',
        startDate: '2024-02-01',
        endDate: '2024-12-31',
      },
    ],
    birthday: '1985-03-15',
  });

  const [newTreatment, setNewTreatment] = useState<Partial<MedicalTreatment>>({
    medication: '',
    frequency: '',
    indication: '',
    status: 'Active',
    startDate: '',
    endDate: '',
  });

  const [showAddTreatment, setShowAddTreatment] = useState(false);

  const handlePatientUpdate = (field: keyof UpdatePatient, value: string) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleTreatmentUpdate = (
    treatmentId: string,
    field: keyof MedicalTreatment,
    value: string
  ) => {
    setPatient((prev) => ({
      ...prev,
      medicalTreatments: (prev.medicalTreatments ?? []).map((treatment) =>
        treatment.id === treatmentId
          ? { ...treatment, [field]: value }
          : treatment
      ),
    }));
  };

  const addTreatment = () => {
    if (
      newTreatment.medication &&
      newTreatment.frequency &&
      newTreatment.indication
    ) {
      const treatment: MedicalTreatment = {
        id: Date.now().toString(),
        medication: newTreatment.medication!,
        frequency: newTreatment.frequency!,
        indication: newTreatment.indication!,
        status:
          (newTreatment.status as 'Active' | 'Completed' | 'Discontinued') ||
          'Active',
        startDate: newTreatment.startDate!,
        endDate: newTreatment.endDate!,
      };

      setPatient((prev) => ({
        ...prev,
        medicalTreatments: [...(prev.medicalTreatments ?? []), treatment],
      }));

      setNewTreatment({
        medication: '',
        frequency: '',
        indication: '',
        status: 'Active',
        startDate: '',
        endDate: '',
      });
      setShowAddTreatment(false);
    }
  };

  const removeTreatment = (treatmentId: string) => {
    setPatient((prev) => ({
      ...prev,
      medicalTreatments: (prev.medicalTreatments ?? []).filter(
        (treatment) => treatment.id !== treatmentId
      ),
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Discontinued':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="container mx-auto  max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              Patient Information #{patient.id}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingPatient(!editingPatient)}
            >
              {editingPatient ? (
                <Save className="h-4 w-4" />
              ) : (
                <Edit className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex w-full justify-center">
              <img
                src={`/${patient.photo}` || '/placeholder.svg'}
                alt={patient.name}
                width={200}
                height={200}
                className="object-cover border-white/20 shadow-md"
              />
            </div>
            <div>
              <Label className="font-bold mb-2" htmlFor="name">
                Full Name
              </Label>
              {editingPatient ? (
                <Input
                  id="name"
                  value={patient.name}
                  onChange={(e) => handlePatientUpdate('name', e.target.value)}
                />
              ) : (
                <p className="text-sm font-medium mt-1">{patient.name}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="status">
                Status
              </Label>
              {editingPatient ? (
                <Select
                  value={patient.status}
                  defaultValue={patient.status}
                  onValueChange={(value) =>
                    handlePatientUpdate('status', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm mt-1">{patient.status}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="age">
                Age
              </Label>
              {editingPatient ? (
                <Input
                  id="age"
                  type="number"
                  value={patient.age}
                  onChange={(e) => handlePatientUpdate('age', e.target.value)}
                />
              ) : (
                <p className="text-sm mt-1">{patient.age}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="supervisor">
                Supervisor
              </Label>
              {editingPatient ? (
                <Input
                  id="supervisor"
                  type="text"
                  value={patient.supervisor}
                  onChange={(e) =>
                    handlePatientUpdate('supervisor', e.target.value)
                  }
                />
              ) : (
                <p className="text-sm mt-1">{patient.supervisor}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="gender">
                Gender
              </Label>
              {editingPatient ? (
                <Select
                  value={patient.gender}
                  onValueChange={(value) =>
                    handlePatientUpdate('gender', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm mt-1">{patient.gender}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="birthday">
                Date of Birth
              </Label>
              {editingPatient ? (
                <Input
                  id="birthday"
                  value={patient.birthday}
                  onChange={(e) =>
                    handlePatientUpdate('birthday', e.target.value)
                  }
                  className="border-gray-400"
                />
              ) : (
                <p className="text-sm mt-1">{patient.birthday}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="address">
                Address
              </Label>
              {editingPatient ? (
                <Input
                  id="address"
                  value={patient.address}
                  onChange={(e) =>
                    handlePatientUpdate('address', e.target.value)
                  }
                  className="border-gray-400"
                />
              ) : (
                <p className="text-sm mt-1">{patient.birthday}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="emergency">
                Emergency Contact
              </Label>
              {editingPatient ? (
                <Input
                  id="emergency"
                  value={patient.emergencyContact}
                  onChange={(e) =>
                    handlePatientUpdate('emergencyContact', e.target.value)
                  }
                />
              ) : (
                <p className="text-sm mt-1">{patient.emergencyContact}</p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="lastVisit">
                Last Visit
              </Label>
              {editingPatient ? (
                <Input
                  id="lastVisit"
                  type="date"
                  className="w-full"
                  value={patient.lastVisit}
                  onChange={(e) =>
                    handlePatientUpdate('lastVisit', e.target.value)
                  }
                />
              ) : (
                <p className="text-sm mt-1">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </p>
              )}
            </div>

            <div>
              <Label className="font-bold mb-2" htmlFor="notes">
                Notes
              </Label>
              {editingPatient ? (
                <Textarea
                  id="notes"
                  value={patient.notes}
                  onChange={(e) => handlePatientUpdate('notes', e.target.value)}
                />
              ) : (
                <p className="text-sm mt-1">{patient.notes}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Medical Treatments */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Medical Treatments</CardTitle>
            <Button
              onClick={() => setShowAddTreatment(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Treatment
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add New Treatment Form */}
              {showAddTreatment && (
                <Card className="border-2 border-dashed border-medical-accent">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          className="font-bold mb-2"
                          htmlFor="new-medication"
                        >
                          Medication
                        </Label>
                        <Input
                          id="new-medication"
                          placeholder="e.g., Lisinopril 10mg"
                          value={newTreatment.medication}
                          onChange={(e) =>
                            setNewTreatment((prev) => ({
                              ...prev,
                              medication: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label
                          className="font-bold mb-2"
                          htmlFor="new-frequency"
                        >
                          Frequency
                        </Label>
                        <Input
                          id="new-frequency"
                          placeholder="e.g., Once daily"
                          value={newTreatment.frequency}
                          onChange={(e) =>
                            setNewTreatment((prev) => ({
                              ...prev,
                              frequency: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label
                          className="font-bold mb-2"
                          htmlFor="new-indication"
                        >
                          Indication
                        </Label>
                        <Input
                          id="new-indication"
                          placeholder="e.g., Hypertension"
                          value={newTreatment.indication}
                          onChange={(e) =>
                            setNewTreatment((prev) => ({
                              ...prev,
                              indication: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label className="font-bold mb-2" htmlFor="new-status">
                          Status
                        </Label>
                        <Select
                          value={newTreatment.status}
                          onValueChange={(value) =>
                            setNewTreatment((prev) => ({
                              ...prev,
                              status: value as any,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Discontinued">
                              Discontinued
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="font-bold mb-2" htmlFor="new-start">
                          Start Date
                        </Label>
                        <Input
                          id="new-start"
                          type="date"
                          value={newTreatment.startDate}
                          onChange={(e) =>
                            setNewTreatment((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label className="font-bold mb-2" htmlFor="new-end">
                          End Date
                        </Label>
                        <Input
                          id="new-end"
                          type="date"
                          value={newTreatment.endDate}
                          onChange={(e) =>
                            setNewTreatment((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => setShowAddTreatment(false)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={addTreatment}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Treatment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Treatment List */}
              {(patient.medicalTreatments ?? []).map((treatment) => (
                <Card key={treatment.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-lg">
                          {treatment.medication}
                        </h3>
                        <Badge className={getStatusColor(treatment.status)}>
                          {treatment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setEditingTreatment(
                              editingTreatment === treatment.id
                                ? null
                                : treatment.id
                            )
                          }
                        >
                          {editingTreatment === treatment.id ? (
                            <Save className="h-4 w-4" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTreatment(treatment.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Frequency
                        </Label>
                        {editingTreatment === treatment.id ? (
                          <Input
                            value={treatment.frequency}
                            onChange={(e) =>
                              handleTreatmentUpdate(
                                treatment.id,
                                'frequency',
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm mt-1">{treatment.frequency}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Indication
                        </Label>
                        {editingTreatment === treatment.id ? (
                          <Input
                            value={treatment.indication}
                            onChange={(e) =>
                              handleTreatmentUpdate(
                                treatment.id,
                                'indication',
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm mt-1">{treatment.indication}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Status
                        </Label>
                        {editingTreatment === treatment.id ? (
                          <Select
                            value={treatment.status}
                            onValueChange={(value) =>
                              handleTreatmentUpdate(
                                treatment.id,
                                'status',
                                value
                              )
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="Discontinued">
                                Discontinued
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm mt-1">{treatment.status}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Start Date
                        </Label>
                        {editingTreatment === treatment.id ? (
                          <Input
                            type="date"
                            value={treatment.startDate}
                            onChange={(e) =>
                              handleTreatmentUpdate(
                                treatment.id,
                                'startDate',
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm mt-1">
                            {new Date(treatment.startDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">
                          End Date
                        </Label>
                        {editingTreatment === treatment.id ? (
                          <Input
                            type="date"
                            value={treatment.endDate}
                            onChange={(e) =>
                              handleTreatmentUpdate(
                                treatment.id,
                                'endDate',
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm mt-1">
                            {new Date(treatment.endDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(patient.medicalTreatments ?? []).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No medical treatments recorded yet.</p>
                  <p className="text-sm">
                    Click "Add Treatment" to get started.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
