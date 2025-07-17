import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FoodDishCard = ({ dish, quantity, onAdd, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.dishInfo}>
          <Text style={styles.dishName} numberOfLines={1}>
            {dish.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {dish.description}
          </Text>
          <View style={styles.detailsRow}>
            <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.prepTime}>{dish.preparationTime}</Text>
          </View>
        </View>
        
        <View style={styles.quantityContainer}>
          {quantity > 0 ? (
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={onRemove}
              >
                <Ionicons name="remove" size={16} color="#000000" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={onAdd}
              >
                <Ionicons name="add" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
              <Ionicons name="add" size={16} color="#000000" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 8,
    fontWeight: '400',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  separator: {
    fontSize: 14,
    color: '#CCCCCC',
    marginHorizontal: 8,
  },
  prepTime: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  quantityContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    minWidth: 24,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 4,
  },
});

export default FoodDishCard; 