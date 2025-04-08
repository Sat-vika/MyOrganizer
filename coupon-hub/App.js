import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddCouponScreen from './screens/AddCouponScreen';
import ViewCouponsScreen from './screens/ViewCouponsScreen';

import { CouponProvider } from './context/CouponContext';
import { ThemeProvider } from './context/ThemeContext';
import EditCouponScreen from './screens/EditCouponScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <CouponProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="AddCoupon" component={AddCouponScreen} />
              <Stack.Screen name="ViewCoupons" component={ViewCouponsScreen} />
              <Stack.Screen name="EditCoupon" component={EditCouponScreen} />

            </Stack.Navigator>
          </NavigationContainer>
        </CouponProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
