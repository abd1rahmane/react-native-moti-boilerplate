import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MotiView } from '@motify/components';
import { FadeInView } from '../components/FadeInView';

export const HomeScreen = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setVisible(!visible)} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Animation</Text>
      </Pressable>

      {visible && (
        <FadeInView>
          <MotiView
            from={{
              translateY: -20,
            }}
            animate={{
              translateY: 0,
            }}
            transition={{
              type: 'spring',
              damping: 10,
            }}
            style={styles.content}
          >
            <Text style={styles.text}>Welcome to Moti Boilerplate!</Text>
          </MotiView>
        </FadeInView>
      )}
    </View>
  );
};

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
  content: {
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
