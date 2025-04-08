// screens/EditCouponScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { CouponContext } from '../context/CouponContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCouponScreen = () => {
  const { updateCoupon } = useContext(CouponContext);
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { coupon } = route.params;

  const [app, setApp] = useState(coupon?.app || '');
  const [title, setTitle] = useState(coupon?.title || '');
  const [details, setDetails] = useState(coupon?.details || '');
  const [code, setCode] = useState(coupon?.code || '');
  const [expiry, setExpiry] = useState(coupon?.expiry || '');

  const handleSave = () => {
    if (!title || !details) {
      Alert.alert('Validation', 'Please fill in at least the title and details.');
      return;
    }

    updateCoupon({
      ...coupon,
      app,
      title,
      details,
      code,
      expiry,
    });

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
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Title</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Details</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={details}
        onChangeText={setDetails}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Code</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={code}
        onChangeText={setCode}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Expiry Date</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        value={expiry}
        onChangeText={setExpiry}
        placeholder="e.g. 2025-04-30"
      />

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
    padding: 8,
    marginTop: 4,
    borderRadius: 6,
  },
});

export default EditCouponScreen;
