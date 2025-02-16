import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AddToCartAnimation } from '../components/animations/AddToCartAnimation';
import { HeartLikeAnimation } from '../components/animations/HeartLikeAnimation';
import { ShakeAnimation } from '../components/animations/ShakeAnimation';
import { PulseAnimation } from '../components/animations/PulseAnimation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [shake, setShake] = React.useState(false);

  const handleAddToCart = () => {
    setShake(true);
    setTimeout(() => setShake(false), 800);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Native Animation Examples</Text>
        
        <Pressable style={styles.section} onPress={() => navigation.navigate('AddToCart')}>
          <Text style={styles.sectionTitle}>Add to Cart Animation</Text>
          <View style={styles.demoRow}>
            <AddToCartAnimation onPress={() => {}} size={60} />
            <Text style={styles.description}>Tap to see detailed add to cart animation</Text>
          </View>
        </Pressable>

        <Pressable style={styles.section} onPress={() => navigation.navigate('HeartLike')}>
          <Text style={styles.sectionTitle}>Like Animation</Text>
          <View style={styles.demoRow}>
            <HeartLikeAnimation onPress={() => {}} size={40} />
            <Text style={styles.description}>Tap to see detailed like animation</Text>
          </View>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shake Animation</Text>
          <View style={styles.demoRow}>
            <ShakeAnimation shake={shake}>
              <View style={styles.shakeBox}>
                <Text style={styles.shakeText}>🛍️</Text>
              </View>
            </ShakeAnimation>
            <Text style={styles.description}>Cart shakes when item is added</Text>
          </View>
        </View>

        <Pressable style={styles.section} onPress={() => navigation.navigate('Pulse')}>
          <Text style={styles.sectionTitle}>Pulse Animation</Text>
          <View style={styles.demoRow}>
            <PulseAnimation size={40} color="#ff4b4b" />
            <Text style={styles.description}>Tap to see detailed pulse animation</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  shakeBox: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  shakeText: {
    fontSize: 24,
  },
});
