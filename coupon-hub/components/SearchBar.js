// components/SearchBar.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ searchTerm, onChange }) => {
  const { dark } = useTheme();

  return (
    <TextInput
      placeholder="Search coupons..."
      placeholderTextColor={dark ? '#999' : '#666'}
      value={searchTerm}
      onChangeText={onChange}
      style={[
        styles.input,
        {
          backgroundColor: dark ? '#333' : '#f0f0f0',
          color: dark ? '#fff' : '#000',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default SearchBar;
