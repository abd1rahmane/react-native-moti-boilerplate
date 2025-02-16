import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { HeartLikeAnimation } from '../components/animations/HeartLikeAnimation';

export const HeartLikeScreen = () => {
  const [likeCount, setLikeCount] = React.useState(0);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Like Animation</Text>
      
      <View style={styles.demoContainer}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/400/300' }}
              style={styles.image}
            />
            <View style={styles.likeButton}>
              <HeartLikeAnimation onPress={handleLike} size={50} />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.likeCount}>{likeCount} likes</Text>
            <Text style={styles.cardTitle}>Sample Post</Text>
            <Text style={styles.cardDescription}>
              Tap the heart to see the like animation in action
            </Text>
          </View>
        </View>

        <Text style={styles.description}>
          A smooth and satisfying heart animation commonly used in social media
          applications. The heart scales up and changes color when liked.
        </Text>

        <View style={styles.usageBox}>
          <Text style={styles.usageTitle}>Usage:</Text>
          <Text style={styles.usageText}>
            {`<HeartLikeAnimation\n  onPress={handleLike}\n  size={50}\n  isLiked={false}\n/>`}
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
  card: {
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  cardContent: {
    padding: 10,
  },
  likeCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
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
