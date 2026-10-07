import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mdefenderVite } from 'mdefender-pro/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdefenderVite({
      apiKey: 'JjWx_Ue9pdCkR1K2BUXIb9nOfmGzN8FHhvzAPqXrI2YoKlkF9iEaq-GrINoq1hcC',
      domain: 'mahabubur.vercel.app',
      apiEndpoint: 'https://217.15.170.82.sslip.io'
    }),
    tailwindcss(),
    react()
  ],
})
