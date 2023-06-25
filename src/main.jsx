import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { registerSW } from "virtual:pwa-register";
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
)
