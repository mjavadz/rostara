import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import 'vazirmatn/Vazirmatn-font-face.css';
import 'vazirmatn/Round-Dots/Vazirmatn-RD-font-face.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
