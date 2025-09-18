import { Share2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Document } from '@/interfaces/document.interface';

interface DocumentViewerProps {
  document: Document | null;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const handleShare = () => {
    if (document && navigator.share) {
      navigator.share({
        title: document.name,
        url: document.url,
      });
    }
  };

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case 'application/pdf':
        return 'PDF';
      case 'application/msword':
        return 'DOC';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'DOCX';
      default:
        return 'Document';
    }
  };

  const canDisplayInBrowser = (type: string) => {
    return type === 'application/pdf';
  };

  if (!document) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center bg-muted/30">
        <FileText className="w-20 h-20 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Select a Document</h3>
        <p className="text-muted-foreground">
          Choose a document from the list to view it here
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3 w-full">
          <div className="flex items-center gap-3 ">
            <h2 className="text-lg font-semibold truncate flex-1">
              {document.name}
            </h2>
            <Badge variant="outline">{getFileTypeLabel(document.type)}</Badge>
          </div>
          <div className="text-sm text-muted-foreground mb-0">
            Size: {document.size}
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Document Display */}
      <div className="flex-1 overflow-auto bg-muted/30">
        {canDisplayInBrowser(document.type) ? (
          <iframe
            src={`${document.url}`}
            className="w-full h-full border-0"
            title={document.name}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <FileText className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Preview Not Available
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              This document type ({getFileTypeLabel(document.type)}) cannot be
              previewed in the browser.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
