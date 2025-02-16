import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

interface AddToCartAnimationProps {
  onPress: () => void;
  size?: number;
}

export const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({
  onPress,
  size = 50,
}) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handlePress = () => {
    setIsAnimating(true);
    onPress();
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.container, { width: size, height: size }]}>
        <MotiView
          style={[styles.circle, { width: size, height: size }]}
          animate={{
            scale: isAnimating ? [1, 1.2, 1] : 1,
            borderWidth: isAnimating ? [1, 2, 1] : 1,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }}
        >
          <MotiView
            style={styles.plus}
            animate={{
              opacity: isAnimating ? [1, 0, 1] : 1,
              scale: isAnimating ? [1, 0.5, 1] : 1,
            }}
            transition={{
              type: 'timing',
              duration: 1000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
});
