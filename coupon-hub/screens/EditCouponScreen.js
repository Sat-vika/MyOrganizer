

import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Platform, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CouponContext } from '../context/CouponContext';
import { useTheme } from '../context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditCouponScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateCoupon } = useContext(CouponContext);
  const { theme } = useTheme();

  const { coupon } = route.params;

  const [app, setApp] = useState(coupon?.app || '');
  const [title, setTitle] = useState(coupon?.title || '');
  const [description, setDescription] = useState(coupon?.description || '');
  const [code, setCode] = useState(coupon?.code || '');
  const [expiryDate, setExpiryDate] = useState(coupon?.expiryDate || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd
      setExpiryDate(formattedDate);
    }
  };

  const handleSave = () => {
    if (!title || !description) {
      Alert.alert('Validation Error', 'Please fill in at least the title and description.');
      return;
    }

    const updatedCoupon = {
      ...coupon,
      app,
      title,
      description,
      code,
      expiryDate,
    };

    updateCoupon(updatedCoupon);
    Alert.alert('Success', 'Coupon updated successfully');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>App Name</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={app}
        onChangeText={setApp}
        placeholder="e.g. Swiggy, Paytm"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Title</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Code</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={code}
        onChangeText={setCode}
        placeholder="Enter code"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Expiry Date</Text>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={[styles.datePickerButton, { borderColor: theme.colors.border }]}
      >
        <Text style={{ color: theme.colors.text }}>{expiryDate || 'Select Expiry Date'}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={expiryDate ? new Date(expiryDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <Button title="Save Changes" onPress={handleSave} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  datePickerButton: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default EditCouponScreen;
