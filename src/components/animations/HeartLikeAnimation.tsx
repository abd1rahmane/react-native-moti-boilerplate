import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

interface HeartLikeAnimationProps {
  onPress: () => void;
  size?: number;
  isLiked?: boolean;
}

export const HeartLikeAnimation: React.FC<HeartLikeAnimationProps> = ({
  onPress,
  size = 30,
  isLiked = false,
}) => {
  const [liked, setLiked] = React.useState(isLiked);

  const handlePress = () => {
    setLiked(!liked);
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <MotiView
        style={[styles.heart, { width: size, height: size }]}
        animate={{
          scale: liked ? [1, 1.3, 1] : 1,
          backgroundColor: liked ? '#ff4b4b' : '#fff',
        }}
        transition={{
          type: 'timing',
          duration: 400,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }}
      >
        <MotiView
          style={[styles.heartInner, { borderColor: liked ? '#ff4b4b' : '#000' }]}
          animate={{
            scale: liked ? [1, 0.8, 1] : 1,
          }}
          transition={{
            type: 'timing',
            duration: 400,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }}
        />
      </MotiView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heart: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  heartInner: {
    width: '70%',
    height: '70%',
    borderWidth: 2,
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
});
