import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import Providers from './lib/providers/Providers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Providers>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
   </Providers>
  </StrictMode>
)
