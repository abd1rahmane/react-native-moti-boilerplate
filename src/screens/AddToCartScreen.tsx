import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AddToCartAnimation } from '../components/animations/AddToCartAnimation';
import { ShakeAnimation } from '../components/animations/ShakeAnimation';

export const AddToCartScreen = () => {
  const [shake, setShake] = React.useState(false);

  const handleAddToCart = () => {
    setShake(true);
    setTimeout(() => setShake(false), 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add to Cart Animation</Text>
      
      <View style={styles.demoContainer}>
        <View style={styles.row}>
          <AddToCartAnimation onPress={handleAddToCart} size={80} />
          <ShakeAnimation shake={shake}>
            <View style={styles.cartBox}>
              <Text style={styles.cartIcon}>🛍️</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
          </ShakeAnimation>
        </View>

        <Text style={styles.description}>
          This animation demonstrates a common e-commerce interaction where clicking
          the add button triggers a satisfying animation and shakes the cart to
          indicate the item was added successfully.
        </Text>

        <View style={styles.usageBox}>
          <Text style={styles.usageTitle}>Usage:</Text>
          <Text style={styles.usageText}>
            {`<AddToCartAnimation\n  onPress={handleAddToCart}\n  size={80}\n/>`}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  cartBox: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cartIcon: {
    fontSize: 30,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4b4b',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  usageText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
  },
});
