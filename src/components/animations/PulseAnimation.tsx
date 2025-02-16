import React from 'react';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

interface PulseAnimationProps {
  size?: number;
  color?: string;
  repeat?: boolean;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  size = 100,
  color = '#007AFF',
  repeat = true,
}) => {
  return (
    <MotiView style={[styles.container, { width: size, height: size }]}>
      <MotiView
        from={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 0,
          shadowOpacity: 0.5,
        }}
        animate={{
          width: size * 2,
          height: size * 2,
          borderRadius: size,
          borderWidth: size / 10,
          opacity: 0,
        }}
        transition={{
          type: 'timing',
          duration: 2000,
          easing: Easing.out(Easing.ease),
          loop: repeat,
          repeatReverse: false,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          styles.pulse,
          { borderColor: color },
        ]}
      />
      <MotiView
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
