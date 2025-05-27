import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <footer className={`py-4 px-6 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-600'} text-center text-sm`}>
      <div className="container mx-auto">
        <p>
          HashMaster &copy; {new Date().getFullYear()} - A secure text hashing and encoding tool
        </p>
        <p className="mt-1">
          All operations are performed locally in your browser. Your data never leaves your device.
        </p>
      </div>
    </footer>
  );
};

export default Footer;