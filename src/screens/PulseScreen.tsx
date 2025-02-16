import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PulseAnimation } from '../components/animations/PulseAnimation';

export const PulseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pulse Animation</Text>
      
      <View style={styles.demoContainer}>
        <View style={styles.demoBox}>
          <View style={styles.row}>
            <PulseAnimation size={40} color="#ff4b4b" />
            <PulseAnimation size={60} color="#4b4bff" />
            <PulseAnimation size={40} color="#4bff4b" />
          </View>
        </View>

        <Text style={styles.description}>
          The pulse animation creates a ripple effect that expands outward from
          the center. It's commonly used to draw attention to important elements
          or indicate an active state.
        </Text>

        <View style={styles.usageBox}>
          <Text style={styles.usageTitle}>Common Use Cases:</Text>
          <View style={styles.useCase}>
            <PulseAnimation size={30} color="#ff4b4b" />
            <Text style={styles.useCaseText}>Live Recording Indicator</Text>
          </View>
          <View style={styles.useCase}>
            <PulseAnimation size={30} color="#4b4bff" />
            <Text style={styles.useCaseText}>Location Marker</Text>
          </View>
          <View style={styles.useCase}>
            <PulseAnimation size={30} color="#4bff4b" />
            <Text style={styles.useCaseText}>Active Status</Text>
          </View>
        </View>

        <View style={styles.codeBox}>
          <Text style={styles.codeTitle}>Usage:</Text>
          <Text style={styles.codeText}>
            {`<PulseAnimation\n  size={40}\n  color="#ff4b4b"\n  repeat={true}\n/>`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  demoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  demoBox: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  usageBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  useCase: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  useCaseText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#666',
  },
  codeBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
});
