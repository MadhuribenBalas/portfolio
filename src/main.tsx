import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/outfit/latin-500.css'
import '@fontsource/outfit/latin-600.css'
import '@fontsource/outfit/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './styles/index.css'
import App from './App'

// Lets CSS hide scroll-reveal content only when JavaScript is running
document.documentElement.classList.add('js')

// HashRouter: URLs look like /#/projects. This works on GitHub Pages with no server
// configuration, and links shared on LinkedIn never return a 404.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
