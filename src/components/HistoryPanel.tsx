import React, { useContext } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

type HistoryItem = {
  input: string;
  output: string;
  algorithm: string;
  type: 'hash' | 'encode';
  timestamp: Date;
};

interface HistoryPanelProps {
  history: HistoryItem[];
  onItemClick: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onItemClick }) => {
  const { darkMode } = useContext(ThemeContext);
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (history.length === 0) {
    return (
      <div className={`p-6 text-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-lg`}>
        <Clock className="h-10 w-10 mx-auto mb-3 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No history yet</h3>
        <p>Your hash and encode operations will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium mb-4">Recent Operations</h3>
      {history.map((item, index) => (
        <div 
          key={index}
          onClick={() => onItemClick(item)}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.type === 'hash' 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                  : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
              }`}>
                {item.type === 'hash' ? 'Hash' : 'Encode'}
              </span>
              <span className="ml-2 text-sm font-medium">{item.algorithm}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(item.timestamp)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {truncateText(item.input, 30)}
            </span>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <span className="font-mono">{truncateText(item.output, 30)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;