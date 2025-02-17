import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image, Dimensions, Pressable, StatusBar, FlatList, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import Animated, { withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { AddToCart} from '../components/animations/AddToCartAnimation';
import { ShakeAnimation } from '../components/animations/ShakeAnimation';

const CartIcon = ({ 
  accentColor, 
  primaryColor, 
  cartCount,
  backgroundColor,
  onPress
}: { 
  accentColor: string; 
  primaryColor: string; 
  cartCount: number;
  backgroundColor: string;
  onPress: () => void;
}) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.cartContainer, {
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
  </TouchableOpacity>
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
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [isFavorite, setIsFavorite] = React.useState(false);

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
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={[styles.productTitle, { color: accentColor }]}>{SNEAKER_IMAGES[activeIndex].title}</Text>
              <Text style={[styles.productPrice, { color: accentColor }]}>${SNEAKER_IMAGES[activeIndex].price}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.favoriteButton, { borderColor: accentColor }]}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <MaterialCommunityIcons 
                name={isFavorite ? 'heart' : 'heart-outline'} 
                size={24} 
                color={accentColor} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.description, { color: accentColor }]}>
            Premium comfort meets iconic style. These Nike Air Force 1s feature durable leather, classic design, and Air cushioning.
          </Text>
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
        onPress={() => setShowCheckout(true)}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCheckout}
        onRequestClose={() => setShowCheckout(false)}
      >
        <View style={styles.modalOverlay}>
          <MotiView 
            from={{ 
              translateY: 1000,
              opacity: 0 
            }}
            animate={{ 
              translateY: 0,
              opacity: 1 
            }}
            transition={{ 
              type: 'spring',
              damping: 20
            }}
            style={[styles.modalContent, { backgroundColor }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: accentColor }]}>Your Cart</Text>
              <MotiView
                from={{ rotate: '0deg', scale: 0.5 }}
                animate={{ rotate: '360deg', scale: 1 }}
                transition={{ type: 'timing', duration: 350 }}
              >
                <TouchableOpacity 
                  style={[styles.closeButton, { backgroundColor: accentColor }]} 
                  onPress={() => setShowCheckout(false)}
                >
                  <MaterialCommunityIcons name="close" size={22} color={backgroundColor} />
                </TouchableOpacity>
              </MotiView>
            </View>
            
            <View style={styles.cartItems}>
              <View style={[styles.cartItem, { borderColor: accentColor }]}>
                <Image 
                  source={{ uri: SNEAKER_IMAGES[activeIndex].uri }}
                  style={styles.cartItemImage}
                  resizeMode="contain"
                />
                <View style={styles.cartItemInfo}>
                  <Text style={[styles.cartItemTitle, { color: accentColor }]}>{SNEAKER_IMAGES[activeIndex].title}</Text>
                  <Text style={[styles.cartItemSize, { color: accentColor }]}>Size: {selectedSize}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={[styles.quantityButton, { borderColor: accentColor }]}
                      onPress={() => quantity > 1 && setQuantity(q => q - 1)}
                    >
                      <Text style={[styles.quantityButtonText, { color: accentColor }]}>-</Text>
                    </TouchableOpacity>
                    <Text style={[styles.quantity, { color: accentColor }]}>{quantity}</Text>
                    <TouchableOpacity 
                      style={[styles.quantityButton, { borderColor: accentColor }]}
                      onPress={() => setQuantity(q => q + 1)}
                    >
                      <Text style={[styles.quantityButtonText, { color: accentColor }]}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.cartItemPrice, { color: accentColor }]}>${(SNEAKER_IMAGES[activeIndex].price * quantity).toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: accentColor }]}
              onPress={() => {
                setShowCheckout(false);
                setCartCount(0);
              }}
            >
              <Text style={[styles.checkoutButtonText, { color: backgroundColor }]}>Proceed to Payment</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </Modal>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
    opacity: 0.8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: height * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItems: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemSize: {
    fontSize: 14,
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sizesContainer: {
    marginTop: 12,
  },
  sizeTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
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
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: -40,
  },
  productImage: {
    width: width * 0.8,
    height: height * 0.4,
    transform: [{ scale: 1.3 }],
  },
  productInfo: {
    padding: 20,
    paddingTop: 5,
  },
  productTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
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
