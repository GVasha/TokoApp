import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RestaurantCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {/* Restaurant Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.deliveryTimeContainer}>
          <Text style={styles.deliveryTimeText}>{restaurant.deliveryTime}</Text>
        </View>
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={16} color="#666666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.priceRange}</Text>

        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#000000" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
          
          <Text style={styles.separator}>•</Text>
          <Text style={styles.distance}>{restaurant.distance}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.deliveryFee}>{restaurant.deliveryFee} delivery</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {restaurant.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 0,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  deliveryTimeContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deliveryTimeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  infoContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  moreButton: {
    padding: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '400',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    color: '#CCCCCC',
    marginHorizontal: 6,
  },
  distance: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  deliveryFee: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    fontWeight: '400',
  },
});

export default RestaurantCard; 