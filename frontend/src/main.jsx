import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <App />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'glass-panel text-white border border-purple-500/30',
              style: {
                background: 'rgba(15, 10, 36, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
              },
            }}
          />
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
