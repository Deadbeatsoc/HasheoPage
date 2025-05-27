import React, { useState, useContext } from 'react';
import { Copy, Check } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

interface OutputSectionProps {
  outputText: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ outputText }) => {
  const [copied, setCopied] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
      <div className="flex justify-between items-center mb-3">
        <label htmlFor="output-text" className="text-lg font-semibold">
          Result
        </label>
        {outputText && (
          <button
            onClick={handleCopy}
            className={`p-2 rounded-full ${copied ? 'bg-green-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'} transition-all duration-300`}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
      </div>
      <div
        className={`w-full min-h-[100px] p-3 rounded-md ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } border ${
          darkMode ? 'border-gray-600' : 'border-gray-300'
        } font-mono text-sm overflow-x-auto`}
      >
        {outputText || <span className="text-gray-400">Result will appear here...</span>}
      </div>
      {outputText && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Length: {outputText.length} characters
        </div>
      )}
    </div>
  );
};

export default OutputSection;