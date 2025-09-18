import { useState } from 'react';
import { FileText, Folder, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Document } from '@/interfaces/document.interface';

interface DocumentListProps {
  onDocumentSelect: (document: Document) => void;
  selectedDocumentId?: string;
}

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Patient Record - John Doe',
    type: 'application/pdf',
    size: '2.3 MB',
    dateModified: '2024-01-15',
    url: '/ins-llc.pdf',
  },
  {
    id: '2',
    name: 'Treatment Plan - Jane Smith',
    type: 'application/pdf',
    size: '1.8 MB',
    dateModified: '2024-01-14',
    url: '/api/placeholder/400/600',
  },
  {
    id: '3',
    name: 'Medical History - Bob Johnson',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: '890 KB',
    dateModified: '2024-01-13',
    url: '/api/placeholder/400/600',
  },
  {
    id: '4',
    name: 'Lab Results - Alice Wilson',
    type: 'application/pdf',
    size: '1.2 MB',
    dateModified: '2024-01-12',
    url: '/api/placeholder/400/600',
  },
  {
    id: '5',
    name: 'Insurance Forms - Mike Davis',
    type: 'application/msword',
    size: '654 KB',
    dateModified: '2024-01-11',
    url: '/api/placeholder/400/600',
  },
  {
    id: '6',
    name: 'Prescription Notes - Sarah Brown',
    type: 'application/pdf',
    size: '445 KB',
    dateModified: '2024-01-10',
    url: '/api/placeholder/400/600',
  },
];

export const DocumentList = ({
  onDocumentSelect,
  selectedDocumentId,
}: DocumentListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents] = useState<Document[]>(mockDocuments);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-medical-600" />;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              onClick={() => onDocumentSelect(document)}
              className={cn(
                'flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent/50',
                selectedDocumentId === document.id
                  ? 'border-medical-500 bg-medical-50 dark:bg-medical-950'
                  : 'border-border hover:border-medical-300'
              )}
            >
              <div className="relative mb-3">
                <Folder className="w-12 h-12 text-medical-500" />
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                  {getFileIcon(document.type)}
                </div>
              </div>

              <div className="text-center w-full">
                <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                  {document.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {document.size}
                </p>
                <p className="text-xs text-muted-foreground">
                  {document.dateModified}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No documents found</p>
            {searchTerm && (
              <p className="text-sm">Try adjusting your search terms</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
