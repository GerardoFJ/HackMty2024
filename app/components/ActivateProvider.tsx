'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the context value
interface ActivateContextType {
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the Context
export const ActivateContext = createContext<ActivateContextType | undefined>(undefined);

// Define the type for the props of the ActivateProvider
interface ActivateProviderProps {
  children: ReactNode;
}

// Create a provider component to wrap the global state
export function ActivateProvider({ children }: ActivateProviderProps) {
  const [activate, setActivate] = useState<boolean>(false);

  // Load the value from localStorage when the component mounts
  useEffect(() => {
    setActivate(false);
    const storedActivate = localStorage.getItem('activate');
    if (storedActivate !== null) {
      setActivate(JSON.parse(storedActivate));
    }
  }, []);

  // Save the activate state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activate', JSON.stringify(activate));
  }, [activate]);


  return (
    <ActivateContext.Provider value={{ activate, setActivate }}>
      {children}
    </ActivateContext.Provider>
  );
}
