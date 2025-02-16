import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddToCartScreen } from './src/screens/AddToCartScreen';
import { HeartLikeScreen } from './src/screens/HeartLikeScreen';
import { PulseScreen } from './src/screens/PulseScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Animation Examples' }}
        />
        <Stack.Screen
          name="AddToCart"
          component={AddToCartScreen}
          options={{ title: 'Add to Cart' }}
        />
        <Stack.Screen
          name="HeartLike"
          component={HeartLikeScreen}
          options={{ title: 'Heart Like' }}
        />
        <Stack.Screen
          name="Pulse"
          component={PulseScreen}
          options={{ title: 'Pulse' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
