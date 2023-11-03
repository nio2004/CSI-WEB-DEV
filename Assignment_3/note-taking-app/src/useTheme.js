import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const [currentTheme, setCurrentTheme] = useState(themeContext.defaultTheme);

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return { currentTheme, toggleTheme };
}


