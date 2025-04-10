//import DateTimePicker from '@react-native-community/datetimepicker';

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
//import DateTimePicker from '@react-native-community/datetimepicker';

export const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [alertThreshold, setAlertThreshold] = useState(1); // default 1 day before

  // Request permission on mount
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  // Check if coupon is expired
  const isExpired = (coupon) => new Date(coupon.expiryDate) < new Date();

  // Load coupons from AsyncStorage
  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const storedCoupons = await AsyncStorage.getItem('coupons');
        if (storedCoupons) {
          const parsed = JSON.parse(storedCoupons);
          const validCoupons = parsed.filter((c) => !isExpired(c));
          setCoupons(validCoupons);
        }
      } catch (error) {
        console.error('Failed to load coupons:', error);
      }
    };
    loadCoupons();
  }, []);

  // Save coupons to AsyncStorage on change
  useEffect(() => {
    const saveCoupons = async () => {
      try {
        await AsyncStorage.setItem('coupons', JSON.stringify(coupons));
      } catch (error) {
        console.error('Failed to save coupons:', error);
      }
    };
    saveCoupons();
  }, [coupons]);

  // 🔔 Schedule expiry notification
  const scheduleExpiryNotification = async (coupon) => {
    const expiryTime = new Date(coupon.expiryDate).getTime();
    const notifyAt = expiryTime - alertThreshold * 24 * 60 * 60 * 1000;

    if (notifyAt > Date.now()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Coupon Expiry Reminder',
          body: `"${coupon.title}" is expiring on ${new Date(coupon.expiryDate).toLocaleDateString()}`,
        },
        trigger: new Date(notifyAt),
      });
    }
  };

  // Add a new coupon
  const addCoupon = ({ app, code, description, expiryDate, title }) => {
    const newCoupon = {
      id: Date.now().toString(),
      app,
      code,
      description,
      expiryDate,
      title,
      timestamp: new Date().toISOString(),
    };
    setCoupons((prev) => [...prev, newCoupon]);
    scheduleExpiryNotification(newCoupon);
  };

  // Delete a coupon by ID
  const deleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
  };

  // Update an existing coupon
  const updateCoupon = (updatedCoupon) => {
    setCoupons((prev) =>
      prev.map((coupon) => (coupon.id === updatedCoupon.id ? updatedCoupon : coupon))
    );
    scheduleExpiryNotification(updatedCoupon);
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        addCoupon,
        deleteCoupon,
        updateCoupon,
        alertThreshold,
        setAlertThreshold,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
