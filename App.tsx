import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import React from 'react';

export default function App() {
  const [visible, setVisible] = React.useState(true);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setVisible(!visible)} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Animation</Text>
      </Pressable>

      <MotiView
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
        transition={{
          type: 'timing',
          duration: 500,
        }}
        style={styles.animatedBox}
      >
        <Text style={styles.text}>Welcome to Moti!</Text>
      </MotiView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  animatedBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
