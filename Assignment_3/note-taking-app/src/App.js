import React from 'react';
import ThemeProvider from './ThemeProvider';
import NoteTaking from './NoteTaking';


const App = () => {
  return (
    <ThemeProvider>
      <NoteTaking />
    </ThemeProvider>
  );
};

export default App;
