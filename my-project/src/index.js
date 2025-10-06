import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from 'react-router-dom';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;


if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <BrowserRouter>
     <App />
     </BrowserRouter> 
    </ClerkProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
