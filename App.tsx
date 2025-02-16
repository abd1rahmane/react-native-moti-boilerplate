import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { AddToCartScreen } from './src/screens/AddToCartScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AddToCartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
