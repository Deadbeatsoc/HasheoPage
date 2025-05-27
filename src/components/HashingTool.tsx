import React, { useState, useContext } from 'react';
import { Hash, Code, History } from 'lucide-react';
import InputSection from './InputSection';
import OutputSection from './OutputSection';
import TabSelector from './TabSelector';
import HistoryPanel from './HistoryPanel';
import { ThemeContext } from '../context/ThemeContext';
import { hashText } from '../utils/hashingFunctions';
import { encodeText, decodeText } from '../utils/encodingFunctions';

type TabType = 'hash' | 'encode' | 'history';
type HistoryItem = {
  input: string;
  output: string;
  algorithm: string;
  type: 'hash' | 'encode';
  timestamp: Date;
};

const HashingTool = () => {
  const [inputText, setInputText] = useState('');
  const [selectedHashAlgorithm, setSelectedHashAlgorithm] = useState('md5');
  const [selectedEncodeMethod, setSelectedEncodeMethod] = useState('base64');
  const [outputText, setOutputText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('hash');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { darkMode } = useContext(ThemeContext);

  const handleInputChange = (text: string) => {
    setInputText(text);
    processInput(text);
  };

  const processInput = (text: string) => {
    if (!text) {
      setOutputText('');
      return;
    }

    let result = '';
    if (activeTab === 'hash') {
      result = hashText(text, selectedHashAlgorithm);
      addToHistory(text, result, selectedHashAlgorithm, 'hash');
    } else if (activeTab === 'encode') {
      if (isDecoding) {
        try {
          result = decodeText(text, selectedEncodeMethod);
          addToHistory(text, result, selectedEncodeMethod, 'encode');
        } catch (error) {
          result = 'Error: Invalid input for decoding';
        }
      } else {
        result = encodeText(text, selectedEncodeMethod);
        addToHistory(text, result, selectedEncodeMethod, 'encode');
      }
    }
    
    setOutputText(result);
  };

  const addToHistory = (input: string, output: string, algorithm: string, type: 'hash' | 'encode') => {
    const exists = history.some(
      item => item.input === input && item.algorithm === algorithm && item.type === type
    );
    
    if (!exists && input.trim() !== '') {
      const newHistory = [
        { input, output, algorithm, type, timestamp: new Date() },
        ...history
      ].slice(0, 10);
      
      setHistory(newHistory);
    }
  };

  const handleAlgorithmChange = (algorithm: string) => {
    if (activeTab === 'hash') {
      setSelectedHashAlgorithm(algorithm);
    } else {
      setSelectedEncodeMethod(algorithm);
    }
    processInput(inputText);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    processInput(inputText);
  };

  const toggleDecoding = () => {
    setIsDecoding(!isDecoding);
    if (inputText) {
      setInputText(outputText);
      processInput(outputText);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setInputText(item.input);
    setOutputText(item.output);
    setActiveTab(item.type);
    if (item.type === 'hash') {
      setSelectedHashAlgorithm(item.algorithm);
    } else {
      setSelectedEncodeMethod(item.algorithm);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto ${darkMode ? 'dark:bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
      <div className="p-6">
        <TabSelector
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={[
            { id: 'hash', label: 'Hash (One-way)', icon: <Hash className="h-4 w-4" /> },
            { id: 'encode', label: 'Encode/Decode', icon: <Code className="h-4 w-4" /> },
            { id: 'history', label: 'History', icon: <History className="h-4 w-4" /> }
          ]}
        />

        {activeTab === 'history' ? (
          <HistoryPanel history={history} onItemClick={loadHistoryItem} />
        ) : (
          <>
            <InputSection
              inputText={inputText}
              onInputChange={handleInputChange}
              selectedAlgorithm={activeTab === 'hash' ? selectedHashAlgorithm : selectedEncodeMethod}
              onAlgorithmChange={handleAlgorithmChange}
              algorithms={
                activeTab === 'hash'
                  ? [
                      { id: 'md5', label: 'MD5' },
                      { id: 'sha1', label: 'SHA-1' },
                      { id: 'sha256', label: 'SHA-256' },
                      { id: 'sha512', label: 'SHA-512' }
                    ]
                  : [
                      { id: 'base64', label: 'Base64' },
                      { id: 'uri', label: 'URL Encoding' },
                      { id: 'caesar', label: 'Caesar (ROT13)' },
                      { id: 'vigenere', label: 'Vigenère' },
                      { id: 'caesar-vigenere', label: 'Caesar + Vigenère' }
                    ]
              }
              isEncodeTab={activeTab === 'encode'}
              isDecoding={isDecoding}
              onToggleDecode={toggleDecoding}
            />

            <OutputSection outputText={outputText} />
          </>
        )}
      </div>
    </div>
  );
};

export default HashingTool;