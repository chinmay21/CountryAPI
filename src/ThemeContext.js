import { createContext, useContext, useState, useEffect } from 'react';
import './ThemeContext.css';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('mode') === 'true');

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]; // Correct way to get the body element
    localStorage.setItem('mode', mode);
    if (mode) {
      body.classList.add('dark-bg');
      body.classList.remove('light-bg');
    } else {
      body.classList.add('light-bg');
      body.classList.remove('dark-bg');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
















