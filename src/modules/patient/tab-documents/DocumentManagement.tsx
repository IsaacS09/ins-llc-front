import { useState } from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { DocumentList } from './DocumentList';
import { DocumentViewer } from './DocumentViewer';
import type { Document } from '@/interfaces/document.interface';

export const DocumentManagement = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <DocumentList
            onDocumentSelect={handleDocumentSelect}
            selectedDocumentId={selectedDocument?.id}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <DocumentViewer document={selectedDocument} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
