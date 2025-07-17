import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import RestaurantCard from '../components/RestaurantCard';
import BottomNavigation from '../components/BottomNavigation';
import { restaurantData, generateMoreRestaurants } from '../data/restaurantData';

const RestaurantFeedScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [nextId, setNextId] = useState(11);

  const loadMoreRestaurants = useCallback(() => {
    if (loading) return;

    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const newRestaurants = generateMoreRestaurants(nextId);
      setRestaurants(prev => [...prev, ...newRestaurants]);
      setNextId(prev => prev + 10);
      setLoading(false);
    }, 1000);
  }, [loading, nextId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRestaurants(restaurantData);
      setNextId(11);
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'profile') {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Sign Out', 
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            })
          }
        ]
      );
    }
  };

  const renderRestaurant = ({ item }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item)}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#000000" />
        <Text style={styles.loadingText}>Loading more restaurants...</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={20} color="#000000" />
          <Text style={styles.locationText}>Deliver to</Text>
          <Text style={styles.addressText}>123 Main St</Text>
          <Ionicons name="chevron-down" size={16} color="#666666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="heart-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreRestaurants}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#000000']}
            />
          }
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
        
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={handleTabPress}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '400',
  },
  addressText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
});

export default RestaurantFeedScreen; 