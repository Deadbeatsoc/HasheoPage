import React, { useContext } from 'react';
import { Lock, Unlock, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className={`py-4 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Lock className="h-6 w-6 text-indigo-500" />
          <Unlock className="h-6 w-6 text-teal-500" />
          <h1 className="text-xl font-bold">HashMaster</h1>
        </div>
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;