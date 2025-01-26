'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerContextProps {
    selectedSetting: number;
    setSelectedSetting: React.Dispatch<React.SetStateAction<number>>;
    selectedInstruction: string;
    setSelectedInstruction: React.Dispatch<React.SetStateAction<string>>;
}

interface TimerProviderProps {
    children: ReactNode;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [selectedSetting, setSelectedSetting] = useState(0); 
  const [selectedInstruction, setSelectedInstruction] = useState("");

  return (
    <TimerContext.Provider value={{ selectedSetting, setSelectedSetting, selectedInstruction, setSelectedInstruction }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextProps => {
    const context = useContext(TimerContext);
  
    if (!context) {
      throw new Error('useTimerContext must be used within a TimerProvider');
    }
  
    return context;
};
