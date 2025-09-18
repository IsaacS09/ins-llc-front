import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileUploadArea } from '@/components/custom/FileUploadArea';
import { SignatureArea } from '@/components/custom/SignatureArea';
import type { CreatePatient } from '@/interfaces/patient.interface';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';

export const AddNewPatient = () => {
  const [formData, setFormData] = useState<CreatePatient>({
    name: '',
    status: 'Active',
    supervisor: '',
    notes: '',
    documents: [],
    photo: undefined,
    haveSignature: false,
    age: 0,
    gender: 'Male',
    address: '',
    emergencyContact: '',
    birthday: '',
  });

  const handleInputChange = (field: keyof CreatePatient, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleDocumentUpload = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents ? [...prev.documents, file] : [file],
    }));
  };

  const handleSignatureChange = (signature: string) => {
    setFormData((prev) => ({ ...prev, signature }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.status || !formData.supervisor) {
      // toast({
      //   title: 'Missing required fields',
      //   description: 'Please fill in Name, Status, and Supervisor fields',
      //   variant: 'destructive',
      // });
      return;
    }

    // toast({
    //   title: 'Patient record submitted',
    //   description: 'The patient record has been successfully saved',
    // });

    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white min-h-auto">
      <div className="flex flex-row items-center gap-4 mb-5">
        <Link to={'/admin/patients'}>
          <ChevronLeft className="hover:scale-150" />
        </Link>
        <h1 className="text-xl font-bold">Add New Patient</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-medium">Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 md:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>

                <Select
                  value={formData.status}
                  defaultValue={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="w-full border-gray-400">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="border-gray-400"
                  type="number"
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-2">
                <Label htmlFor="supervisor">Supervisor</Label>
                <Input
                  id="supervisor"
                  value={formData.supervisor}
                  onChange={(e) =>
                    handleInputChange('supervisor', e.target.value)
                  }
                  className="border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger className="w-full border-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Date of Birth</Label>
                <Input
                  id="birthday"
                  value={formData.birthday}
                  onChange={(e) =>
                    handleInputChange('birthday', e.target.value)
                  }
                  className="border-gray-400"
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-gray-400"
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange('emergencyContact', e.target.value)
                  }
                  className="border-gray-400"
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="border-gray-400 min-h-[120px]"
                  placeholder="Enter any additional notes here..."
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Document Upload Section */}
              <h2 className="text-lg font-medium">Documents</h2>
              <div className="space-y-2">
                <FileUploadArea
                  type="document"
                  onFileUpload={handleDocumentUpload}
                />
              </div>

              {/* Photo Upload */}
              <h2 className="text-lg font-medium">Photo</h2>
              <div className="space-y-2">
                <FileUploadArea type="photo" onFileUpload={handlePhotoUpload} />
              </div>

              {/* Signature Area */}
              <div className="space-y-2">
                <SignatureArea onSignatureChange={handleSignatureChange} />
              </div>
            </div>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end w-full mt-5">
          <Button
            type="submit"
            className="w-full text-white py-3 text-base font-medium"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
