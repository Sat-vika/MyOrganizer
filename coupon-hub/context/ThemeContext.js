
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = {
    darkMode,
    colors: darkMode
      ? {
          background: '#121212',
          text: '#ffffff',
          card: '#1e1e1e',
          primary: '#bb86fc',
        }
      : {
          background: '#ffffff',
          text: '#000000',
          card: '#f5f5f5',
          primary: '#6200ee',
        },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
