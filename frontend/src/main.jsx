import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initWaf } from 'mdefender-pro/client'

// 🛡️ Initialize MDefender-Pro Client & SPA Shield
initWaf({
  apiKey: 'OQ7hd6JZIAGgtfd5SkuaVT8UHhsGudJF0k2yToygelRo5KSgDVu1qOqq1hdcP8Tp',
  domain: window.location.hostname || 'localhost',
  apiEndpoint: 'http://127.0.0.1:8000'
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)