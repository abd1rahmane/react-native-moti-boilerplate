import React from 'react';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

interface ShakeAnimationProps {
  children: React.ReactNode;
  shake?: boolean;
}

export const ShakeAnimation: React.FC<ShakeAnimationProps> = ({
  children,
  shake = false,
}) => {
  return (
    <MotiView
      style={styles.container}
      animate={{
        translateX: shake ? [-10, 10, -10, 10, -5, 5, -2, 2, 0] : 0,
      }}
      transition={{
        type: 'timing',
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }}
    >
      {children}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
