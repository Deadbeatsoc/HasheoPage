import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabSelectorProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  tabs: Tab[];
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange, tabs }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="flex border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all duration-200 ${
            activeTab === tab.id
              ? `${darkMode ? 'text-white border-b-2 border-indigo-500' : 'text-indigo-600 border-b-2 border-indigo-500'}`
              : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;