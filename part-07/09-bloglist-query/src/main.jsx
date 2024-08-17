import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
