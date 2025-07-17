import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FloatingCart = ({ itemCount, totalAmount, onPress, visible }) => {
  if (!visible || itemCount === 0) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cartButton} onPress={onPress}>
          <View style={styles.leftSection}>
            <View style={styles.itemCountBadge}>
              <Text style={styles.itemCountText}>{itemCount}</Text>
            </View>
            <Text style={styles.viewCartText}>View Cart</Text>
          </View>
          
          <View style={styles.rightSection}>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 15,
  },
  cartButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCountBadge: {
    backgroundColor: '#333333',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  viewCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default FloatingCart; 