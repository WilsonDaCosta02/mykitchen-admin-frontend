import React from "react";
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-white flex flex-col">
          {/* Header abu-abu */}
          <header className="bg-gray-200 w-full">
            <div className="flex justify-between items-center px-12 py-6 max-w-6xl mx-auto">
              <h1 className="text-xl font-bold text-green-900">My Kitchen</h1>
              <nav className="space-x-10 text-gray-700 font-medium flex items-center">
                <a href="#home" className="text-green-900 relative">
                  Home
                  <span className="block w-1.5 h-1.5 bg-green-900 rounded-full mx-auto mt-1"></span>
                </a>
                <a href="#about" className="hover:text-green-800">
                  About Us
                </a>
                <a href="#menu" className="hover:text-green-800">
                  Menu
                </a>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </main>

          {/* Footer abu-abu */}
          <footer className="bg-gray-300 text-gray-700 text-center py-6 mt-auto">
            <p>© 2025 MyKitchen. All Rights Reserved.</p>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;