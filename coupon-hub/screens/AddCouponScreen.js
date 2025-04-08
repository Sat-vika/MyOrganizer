
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { CouponContext } from '../context/CouponContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const AddCouponScreen = () => {
  const { addCoupon } = useContext(CouponContext);
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [app, setApp] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleAddCoupon = () => {
    if (!title || !description || !code || !app || !expiryDate) {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }

    addCoupon({
      title,
      description,
      code,
      app,
      expiryDate,
      timestamp: new Date().toISOString(),
    });

    Alert.alert('Success', 'Coupon added successfully');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>App Name</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="e.g. Swiggy, Zomato"
        placeholderTextColor={theme.colors.placeholder}
        value={app}
        onChangeText={setApp}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Coupon Title</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="e.g. 20% OFF"
        placeholderTextColor={theme.colors.placeholder}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="e.g. Valid on orders above ₹200"
        placeholderTextColor={theme.colors.placeholder}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Coupon Code</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="e.g. SAVE20"
        placeholderTextColor={theme.colors.placeholder}
        value={code}
        onChangeText={setCode}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Expiry Date</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={theme.colors.placeholder}
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Coupon" onPress={handleAddCoupon} color={theme.colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default AddCouponScreen;
