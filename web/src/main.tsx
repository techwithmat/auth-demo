import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'

import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { SessionProvider } from './lib/useSession'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={routes} />
    </SessionProvider>
  </React.StrictMode>
)
