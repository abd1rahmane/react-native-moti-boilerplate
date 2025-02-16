import React from 'react';
import { StyleSheet } from 'react-native';
import { MotiView } from '@motify/components';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
}

export const FadeInView: React.FC<FadeInViewProps> = ({ children, delay = 0 }) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: 'timing',
        duration: 500,
        delay,
      }}
      style={styles.container}
    >
      {children}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
