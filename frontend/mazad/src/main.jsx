import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)










// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // استيراد BrowserRouter
// import App from './App.jsx';
// import './index.css';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter> {/* إضافة BrowserRouter حول التطبيق */}
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// );
