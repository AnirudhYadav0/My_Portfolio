import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Skip-to-content for keyboard/screen-reader users */}
    <a href="#main-content" className="skip-to-content">
      Skip to content
    </a>
    <div id="main-content" style={{ height: '100%' }}>
      <App />
    </div>
  </React.StrictMode>,
)
