import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the context type
interface ProgressContextType {
  progress: number;
  fetchProgress: () => Promise<void>;
  updateProgress: (newProgress: number) => Promise<void>;
}

// Define the props for the Provider
interface ProgressProviderProps {
  children: ReactNode;
}

// Create the context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Provider component
export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState(0);

  const SERVER_URL = 'http://10.135.89.75:3000'; // Replace with your server URL

  // Fetch progress from the server
  const fetchProgress = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/progress`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProgress(data.progress);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  // Update progress on the server
  const updateProgress = async (newProgress: number) => {
    try {
      const response = await fetch(`${SERVER_URL}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: newProgress }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProgress(data.progress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, fetchProgress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to use the context
export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
};
