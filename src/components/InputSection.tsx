import React, { useContext } from 'react';
import { Clipboard, Trash2, RotateCcw } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

type Algorithm = {
  id: string;
  label: string;
};

interface InputSectionProps {
  inputText: string;
  onInputChange: (text: string) => void;
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  algorithms: Algorithm[];
  isEncodeTab: boolean;
  isDecoding: boolean;
  onToggleDecode: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  onInputChange,
  selectedAlgorithm,
  onAlgorithmChange,
  algorithms,
  isEncodeTab,
  isDecoding,
  onToggleDecode
}) => {
  const { darkMode } = useContext(ThemeContext);
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onInputChange(text);
    } catch (error) {
      alert('Unable to access clipboard. Please check your browser permissions.');
    }
  };

  const handleClear = () => {
    onInputChange('');
  };

  return (
    <div className={`mb-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
      <div className="flex justify-between items-center mb-3">
        <label htmlFor="input-text" className="text-lg font-semibold">
          {isEncodeTab 
            ? (isDecoding ? 'Enter text to decode' : 'Enter text to encode') 
            : 'Enter text to hash'}
        </label>
        <div className="flex space-x-2">
          <button
            onClick={handlePaste}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Paste from clipboard"
          >
            <Clipboard className="h-4 w-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Clear input"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <textarea
        id="input-text"
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={isEncodeTab 
          ? (isDecoding ? "Paste encoded text here..." : "Type or paste text to encode...") 
          : "Type or paste text to hash..."}
        className={`w-full h-32 p-3 rounded-md ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } border ${
          darkMode ? 'border-gray-600' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex-1">
          <label className="block mb-2 font-medium">
            {isEncodeTab ? 'Encoding Method:' : 'Hashing Algorithm:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => onAlgorithmChange(algo.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedAlgorithm === algo.id
                    ? 'bg-indigo-600 text-white'
                    : `${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} text-gray-800 dark:text-gray-200`
                }`}
              >
                {algo.label}
              </button>
            ))}
          </div>
        </div>

        {isEncodeTab && (
          <button
            onClick={onToggleDecode}
            className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isDecoding
                ? 'bg-teal-600 text-white'
                : 'bg-amber-500 text-white'
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            {isDecoding ? 'Decode Mode' : 'Encode Mode'}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputSection;