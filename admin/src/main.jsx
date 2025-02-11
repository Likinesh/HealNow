import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AdmincontextProvider } from './context/AdminContext.jsx'
import { DoctorContextProvider } from './context/DoctorContext.jsx'
import { AppcontextProvider } from './context/Appcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdmincontextProvider>
      <DoctorContextProvider>
        <AppcontextProvider>
          <App />
        </AppcontextProvider>
      </DoctorContextProvider>
    </AdmincontextProvider>
  </BrowserRouter>,
)
