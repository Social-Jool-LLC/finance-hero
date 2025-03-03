import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { PlaidLinkProvider } from './context/PlaidLinkContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import ErrorBoundary from './components/common/ErrorBoundary.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <PlaidLinkProvider>
              <App />
            </PlaidLinkProvider>
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
