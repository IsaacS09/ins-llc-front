import { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Printer,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  dateModified: string;
  url: string;
}

interface DocumentViewerProps {
  document: Document | null;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePrint = () => {
    if (document) {
      window.print();
    }
  };

  const handleDownload = () => {
    if (document) {
      const link = window.document.createElement('a');
      link.href = document.url;
      link.download = document.name;
      link.click();
    }
  };

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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold truncate flex-1">
              {document.name}
            </h2>
            <Badge variant="outline">{getFileTypeLabel(document.type)}</Badge>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-3">
          Size: {document.size} • Modified: {document.dateModified}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="px-2 py-1 text-sm bg-muted rounded min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Document Display */}
      <div className="flex-1 overflow-auto bg-muted/30">
        {canDisplayInBrowser(document.type) ? (
          <div
            className="w-full h-full"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <iframe
              src={`${document.url}#zoom=${zoom}`}
              className="w-full h-full border-0"
              title={document.name}
            />
          </div>
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
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download to View
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
