import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "@shopify/polaris/build/esm/styles.css";
import './global.scss'

createRoot(document.getElementById('root')!).render(
  <App />
)
