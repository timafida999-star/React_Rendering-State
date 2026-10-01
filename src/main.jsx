import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/main.scss';

// StrictMode is intentionally NOT used here: in development it renders every
// component twice, which would double every console.log and make the
// re-render investigation harder to read during the defense.
createRoot(document.getElementById('root')).render(<App />);
