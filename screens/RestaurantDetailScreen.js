import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  SectionList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import BalanceCard from '../components/BalanceCard';
import FoodDishCard from '../components/FoodDishCard';
import FloatingCart from '../components/FloatingCart';
import LocationSelector from '../components/LocationSelector';
import { foodCategories, restaurantInfo } from '../data/foodData';

const RestaurantDetailScreen = ({ navigation, route }) => {
  const [balance, setBalance] = useState(45.80); // User's current balance
  const [cart, setCart] = useState({}); // { dishId: quantity }
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Calculate cart totals
  const cartItems = Object.entries(cart).filter(([_, quantity]) => quantity > 0);
  const totalItems = cartItems.reduce((sum, [_, quantity]) => sum + quantity, 0);
  const totalAmount = cartItems.reduce((sum, [dishId, quantity]) => {
    const dish = findDishById(parseInt(dishId));
    return sum + (dish ? dish.price * quantity : 0);
  }, 0);

  function findDishById(dishId) {
    for (const category of foodCategories) {
      const dish = category.dishes.find(d => d.id === dishId);
      if (dish) return dish;
    }
    return null;
  }

  const handleAddDish = (dish) => {
    setCart(prev => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1
    }));
  };

  const handleRemoveDish = (dish) => {
    setCart(prev => ({
      ...prev,
      [dish.id]: Math.max(0, (prev[dish.id] || 0) - 1)
    }));
  };

  const handleAddFunds = () => {
    Alert.alert(
      'Add Funds',
      'How much would you like to add to your balance?',
      [
        { text: '$10', onPress: () => setBalance(prev => prev + 10) },
        { text: '$25', onPress: () => setBalance(prev => prev + 25) },
        { text: '$50', onPress: () => setBalance(prev => prev + 50) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleViewCart = () => {
    Alert.alert(
      'Cart Summary',
      `Items: ${totalItems}\nTotal: $${totalAmount.toFixed(2)}\nBalance: $${balance.toFixed(2)}`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'Checkout', onPress: handleCheckout }
      ]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    Alert.alert(
      'Restaurant Location Updated',
      `Ordering from ${location.name}`,
      [{ text: 'OK' }]
    );
  };

  const handleCheckout = () => {
    if (totalAmount > balance) {
      Alert.alert(
        'Insufficient Balance',
        `You need $${(totalAmount - balance).toFixed(2)} more to complete this order.`,
        [
          { text: 'Add Funds', onPress: handleAddFunds },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } else {
      setBalance(prev => prev - totalAmount);
      setCart({});
      Alert.alert('Order Placed!', `Your order has been placed successfully. Remaining balance: $${(balance - totalAmount).toFixed(2)}`);
    }
  };

  const renderSectionHeader = ({ section: { name } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{name}</Text>
    </View>
  );

  const renderDish = ({ item: dish }) => (
    <FoodDishCard
      dish={dish}
      quantity={cart[dish.id] || 0}
      onAdd={() => handleAddDish(dish)}
      onRemove={() => handleRemoveDish(dish)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {restaurantInfo.name}
        </Text>
        <View style={styles.restaurantDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#000000" />
            <Text style={styles.rating}>{restaurantInfo.rating}</Text>
          </View>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.deliveryTime}>{restaurantInfo.deliveryTime}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="heart-outline" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  const sections = foodCategories.map(category => ({
    name: category.name,
    data: category.dishes
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        
        <SectionList
          sections={sections}
          renderItem={renderDish}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <LocationSelector
                selectedLocation={selectedLocation}
                onLocationChange={handleLocationChange}
                style={styles.locationSelector}
              />
              <BalanceCard 
                balance={balance}
                onAddFunds={handleAddFunds}
              />
            </View>
          )}
          stickySectionHeadersEnabled={false}
        />
        
        <FloatingCart
          itemCount={totalItems}
          totalAmount={totalAmount}
          onPress={handleViewCart}
          visible={totalItems > 0}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginHorizontal: 8,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  listContent: {
    paddingBottom: 120, // Space for floating cart
  },
  locationSelector: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default RestaurantDetailScreen; 