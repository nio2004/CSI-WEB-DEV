import React, { useState } from 'react';
import useTheme from './useTheme';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [defaultTheme, setDefaultTheme] = useState('light');
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ defaultTheme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
