import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import reportWebVitals from './reportWebVitals';

<<<<<<< HEAD:src/index.tsx
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/index.js
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);

reportWebVitals();
