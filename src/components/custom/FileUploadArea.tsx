import { useState, useRef } from 'react';
import { Upload, File, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FileUploadAreaProps {
  type: 'photo' | 'document';
  onFileUpload?: (file: File) => void;
}

export const FileUploadArea = ({ type, onFileUpload }: FileUploadAreaProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    const maxSize = type === 'photo' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for photos, 10MB for documents

    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: `File size must be less than ${maxSize / (1024 * 1024)}MB`,
        variant: 'destructive',
      });
      return;
    }

    const allowedTypes =
      type === 'photo'
        ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        : [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description:
          type === 'photo'
            ? 'Please upload an image file (JPG, PNG, GIF, WebP)'
            : 'Please upload a PDF or Word document',
        variant: 'destructive',
      });
      return;
    }

    setUploadedFile(file);
    onFileUpload?.(file);

    if (type === 'photo' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }

    toast({
      title: 'File uploaded',
      description: `${file.name} uploaded successfully`,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={type === 'photo' ? 'image/*' : '.pdf,.doc,.docx'}
        onChange={handleFileInput}
        className="hidden"
      />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {type === 'photo' && preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto rounded"
            />
            <p className="text-sm text-muted-foreground">
              {uploadedFile?.name}
            </p>
          </div>
        ) : uploadedFile ? (
          <div className="space-y-3">
            <File className="w-16 h-16 mx-auto text-primary" />
            <p className="text-sm font-medium">{uploadedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {type === 'photo' ? (
              <Image className="w-16 h-16 mx-auto text-muted-foreground" />
            ) : (
              <Upload className="w-16 h-16 mx-auto text-muted-foreground" />
            )}
            <div>
              <p className="text-lg font-medium text-muted-foreground">
                {type === 'photo' ? 'Photo' : 'Upload Document'}
              </p>
              <p className="text-sm text-muted-foreground">
                Click or drag to upload{' '}
                {type === 'photo' ? 'an image' : 'a PDF or Word document'}
              </p>
            </div>
          </div>
        )}
      </div>

      {uploadedFile && (
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() => {
            setUploadedFile(null);
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
        >
          Remove File
        </Button>
      )}
    </div>
  );
};
