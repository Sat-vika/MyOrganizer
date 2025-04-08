
import React from 'react';
import { Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      title={theme.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      onPress={toggleTheme}
      color={theme.colors.primary}
    />
  );
};

export default ThemeToggleButton;
