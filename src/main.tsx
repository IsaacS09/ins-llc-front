import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { IntegratedNursingSolutionsApp } from './IntegratedNursingSolutionsApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntegratedNursingSolutionsApp />
  </StrictMode>
);
