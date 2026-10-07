import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initWaf } from 'mdefender-pro/client'

// 🛡️ Initialize MDefender-Pro Client & SPA Shield (Direct HTTPS)
initWaf({
  apiKey: 'JjWx_Ue9pdCkR1K2BUXIb9nOfmGzN8FHhvzAPqXrI2YoKlkF9iEaq-GrINoq1hcC',
  domain: typeof window !== 'undefined' ? (window.location.hostname || 'mahabubur.vercel.app') : 'mahabubur.vercel.app',
  apiEndpoint: 'https://217.15.170.82.sslip.io'
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)