import React, { useState } from 'react';
import Header from './components/Header';
import HashingTool from './components/HashingTool';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-200">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <HashingTool />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;