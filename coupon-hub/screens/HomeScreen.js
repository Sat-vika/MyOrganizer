import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Coupon Organizer</Text>
      <Button title="Add Coupon" onPress={() => navigation.navigate('AddCoupon')} />
      <View style={{ marginTop: 10 }} />
      <Button title="View Coupons" onPress={() => navigation.navigate('ViewCoupons')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default HomeScreen;
