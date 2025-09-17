import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileUploadArea } from '@/components/custom/FileUploadArea';
import { SignatureArea } from '@/components/custom/SignatureArea';

interface PatientFormData {
  name: string;
  status: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  notes: string;
  photo?: File;
  documents?: File[];
  signature?: string;
}

export const AddNewPatient = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    status: '',
    supervisor: '',
    startDate: '',
    endDate: '',
    notes: '',
    documents: [],
  });
  const { toast } = useToast();

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
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
      toast({
        title: 'Missing required fields',
        description: 'Please fill in Name, Status, and Supervisor fields',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Patient record submitted',
      description: 'The patient record has been successfully saved',
    });

    console.log('Form submitted:', formData);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      status: '',
      supervisor: '',
      startDate: '',
      endDate: '',
      notes: '',
      documents: [],
    });

    toast({
      title: 'Form cleared',
      description: 'All form fields have been cleared',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Patient record saved',
      description: 'The patient record has been saved as draft',
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="border-gray-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supervisor">Supervisor</Label>
                <Input
                  id="supervisor"
                  value={formData.supervisor}
                  onChange={(e) =>
                    handleInputChange('supervisor', e.target.value)
                  }
                  className="border-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange('startDate', e.target.value)
                  }
                  className="border-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endDate">End date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="border-gray-400 min-h-[120px]"
                placeholder="Enter any additional notes here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="default"
                className="text-white px-8 py-2"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
                className="px-8 py-2"
              >
                Clear
              </Button>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-medium">Documents</h3>
              <FileUploadArea
                type="document"
                onFileUpload={handleDocumentUpload}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="space-y-4">
              <FileUploadArea type="photo" onFileUpload={handlePhotoUpload} />
            </div>

            {/* Signature Area */}
            <div className="space-y-4">
              <SignatureArea onSignatureChange={handleSignatureChange} />
            </div>

            {/* Save Button */}
            <Button
              type="button"
              onClick={handleSave}
              className="w-full text-white py-3 text-base font-medium"
            >
              SAVE
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
