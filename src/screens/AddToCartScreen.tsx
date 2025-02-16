import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image, Dimensions, Pressable, StatusBar, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import Animated, { withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { AddToCart} from '../components/animations/AddToCartAnimation';
import { ShakeAnimation } from '../components/animations/ShakeAnimation';

const CartIcon = ({ 
  accentColor, 
  primaryColor, 
  cartCount,
  backgroundColor 
}: { 
  accentColor: string; 
  primaryColor: string; 
  cartCount: number;
  backgroundColor: string;
}) => (
  <View style={[styles.cartContainer, {
    backgroundColor: accentColor,
    borderColor: accentColor
  }]}>
    <MaterialCommunityIcons name="cart" size={32} color={primaryColor} style={styles.cartIcon} />
    {cartCount > 0 && (
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        style={[styles.badge, { backgroundColor: accentColor, borderColor: primaryColor }]}
      >
        <Text style={[styles.badgeText, { color: backgroundColor }]}>{cartCount}</Text>
      </MotiView>
    )}
  </View>
);

const COLORS = {
  orange: '#FF6B00',
  backgrounds: [
    { primary: '#1E1E1E', accent: '#FFFFFF' },  // Black bg for white sneaker
    { primary: '#FFFFFF', accent: '#000000' },  // White bg for black sneaker

    { primary: '#FFD700', accent: '#4169E1' }   // Gold bg for blue sneaker
  ]
};

const { width, height } = Dimensions.get('window');

const SNEAKER_IMAGES = [
  {
    id: '1',
    uri: 'https://www.pngarts.com/files/8/Air-Force-One-White-Nike-Shoes-Transparent-Images.png',
    title: 'Nike Air Force 1 White',
    price: 159.99,
  },
  {
    id: '2',
    uri: 'https://www.pngarts.com/files/8/Nike-Air-Force-One-PNG-Download-Image.png',
    title: 'Nike Air Force 1 Black',
    price: 179.99,
  },
  {
    id: '3',
    uri: 'https://www.pngarts.com/files/8/Nike-Air-Force-One-PNG-Pic.png',
    title: 'Nike Air Force 1 Blue',
    price: 199.99,
  },
];

export const AddToCartScreen = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const [backgroundColor, setBackgroundColor] = React.useState(COLORS.backgrounds[0].primary);
  const [accentColor, setAccentColor] = React.useState(COLORS.backgrounds[0].accent);
  const [cartCount, setCartCount] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [buttonPressed, setButtonPressed] = React.useState(false);
  const [showSuccessRing, setShowSuccessRing] = React.useState(false);
  const [showImageAnimation, setShowImageAnimation] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  const SIZES = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'];

  const handleAddToCart = async () => {
    if (isAnimating || !selectedSize) return;
    
    // Trigger haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Start animation sequence
    setIsAnimating(true);
    setButtonPressed(true);
    setShowImageAnimation(true);
    
    // Show success ring after a small delay
    setTimeout(() => setShowSuccessRing(true), 100);
    
    // Reset button press effect
    setTimeout(() => setButtonPressed(false), 200);
    
    // Reset success ring
    setTimeout(() => setShowSuccessRing(false), 1000);
    
    // Reset image animation
    setTimeout(() => setShowImageAnimation(false), 800);
    
    // Update cart count and finish animation
    setTimeout(() => {
      setCartCount(prev => prev + 1);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <MotiView 
      style={styles.container}
      animate={{
        backgroundColor
      }}
      transition={{
        type: 'timing',
        duration: 300,
      }}
    >
      <StatusBar barStyle="light-content" />
      <Image 
        source={{ uri: 'https://pngimg.com/uploads/nike/nike_PNG11.png' }} 
        style={styles.nikeLogo}
        resizeMode="contain"
      />
      
      <FlatList
        ref={flatListRef}
        data={SNEAKER_IMAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(newIndex);
          setBackgroundColor(COLORS.backgrounds[newIndex].primary);
          setAccentColor(COLORS.backgrounds[newIndex].accent);
        }}
        renderItem={({ item, index }) => (
          <MotiView
            animate={{
              scale: showImageAnimation && activeIndex === index ? [1, 1.1, 1] : 1,
              rotate: showImageAnimation && activeIndex === index ? ['0deg', '-20deg', '-15deg'] : '-15deg',
            }}
            transition={{
              type: 'spring',
              damping: 10,
              mass: 0.8,
            }}
            style={styles.productImageContainer}
          >
            <Image 
              source={{ uri: item.uri }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </MotiView>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.pagination}>
        {SNEAKER_IMAGES.map((_, index) => (
          <MotiView
            key={index}
            animate={{
              scale: activeIndex === index ? 1.2 : 1,
              opacity: activeIndex === index ? 1 : 0.5,
              width: activeIndex === index ? 24 : 8,
            }}
            transition={{
              type: 'spring',
              damping: 15,
            }}
            style={[styles.paginationDot, { 
              backgroundColor: activeIndex === index ? accentColor : '#fff',
              width: activeIndex === index ? 32 : 10,
            }]}
          />
        ))}
      </View>
      
      <View style={styles.productInfo}>
        <MotiView 
          animate={{
            translateX: [-20, 0],
            opacity: [0, 1]
          }}
          transition={{
            type: 'timing',
            duration: 300,
          }}
        >
          <Text style={[styles.productTitle, { color: accentColor }]}>{SNEAKER_IMAGES[activeIndex].title}</Text>
          <Text style={[styles.productPrice, { color: accentColor }]}>${SNEAKER_IMAGES[activeIndex].price}</Text>
        </MotiView>

        <View style={styles.sizesContainer}>
        <Text style={[styles.sizeTitle, { color: accentColor }]}>Select Size</Text>
        <View style={styles.sizeButtons}>
          {SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                { borderColor: accentColor },
                selectedSize === size && { backgroundColor: accentColor }
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[
                styles.sizeButtonText,
                { color: accentColor },
                selectedSize === size && { color: backgroundColor }
              ]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        </View>
      </View>

      <MotiView
        animate={{
          scale: buttonPressed ? 0.95 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
        }}
        style={styles.addButtonContainer}
      >
        <Pressable 
          style={[styles.addButton, {
            backgroundColor: selectedSize ? accentColor : '#ccc',
            opacity: selectedSize ? 1 : 0.7
          }, buttonPressed && styles.addButtonPressed]}
          disabled={!selectedSize}
          onPress={handleAddToCart}
        >
        <Text style={[styles.buttonText, { color: backgroundColor }]}>Add to Cart</Text>
        </Pressable>
      </MotiView>

      {isAnimating && (
        <>
          <MotiView
            from={{
              scale: 0,
              opacity: 0.9,
            }}
            animate={{
              scale: [0, 3, 4],
              opacity: [0.9, 0.5, 0],
            }}
            transition={{
              type: 'timing',
              duration: 800,
              scale: {
                type: 'spring',
                damping: 15,
              },
            }}
            style={[styles.waveEffect, { 
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              zIndex: -1
            }]}
          />
          <MotiView
            from={{
              scale: 0,
              opacity: 0.9,
            }}
            animate={{
              scale: [0, 2, 3],
              opacity: [0.9, 0.5, 0],
            }}
            transition={{
              type: 'timing',
              duration: 600,
              scale: {
                type: 'spring',
                damping: 15,
              },
            }}
            style={[styles.waveEffect, { 
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              zIndex: -1,
              backgroundColor: COLORS.backgrounds[0].accent,
            }]}
          />
        </>
      )}

      <CartIcon 
        accentColor={accentColor}
        primaryColor={COLORS.backgrounds[activeIndex].primary}
        cartCount={cartCount}
        backgroundColor={backgroundColor}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  sizesContainer: {
    marginTop: 20,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  sizeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 70,
    alignItems: 'center',
  },
  sizeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    gap: 8,
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  paginationDotActive: {
    backgroundColor: COLORS.backgrounds[0].accent,
  },
  addButtonContainer: {
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 30,
  },
  nikeLogo: {
    width: 60,
    height: 24,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 10,
    tintColor: '#fff',
  },
  waveEffect: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
  },
  addButtonPressed: {
    backgroundColor: COLORS.backgrounds[0].accent,
    transform: [{ scale: 0.98 }],
  },
  container: {
    flex: 1,
  },
  productImageContainer: {
    width: width,
    height: height * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  productImage: {
    width: width * 0.8,
    height: height * 0.45,
    transform: [{ scale: 1.3 }],
  },
  productInfo: {
    padding: 20,
    paddingTop: 5,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '500',
  },
  addButton: {
    width: '100%',
    backgroundColor: COLORS.backgrounds[0].accent,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cartContainer: {
    position: 'absolute',
    top: 57,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartIcon: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  }
});
