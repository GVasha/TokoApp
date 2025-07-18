import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const availableLocations = [
  { id: 1, name: 'Downtown Branch', address: '123 Main St', area: 'Downtown', distance: '0.5 mi', phone: '(555) 123-4567' },
  { id: 2, name: 'Midtown Branch', address: '456 Oak Ave', area: 'Midtown', distance: '1.2 mi', phone: '(555) 234-5678' },
  { id: 3, name: 'Uptown Branch', address: '789 Pine St', area: 'Uptown', distance: '2.1 mi', phone: '(555) 345-6789' },
  { id: 4, name: 'Riverside Branch', address: '321 Elm Dr', area: 'Riverside', distance: '1.8 mi', phone: '(555) 456-7890' },
  { id: 5, name: 'Westside Branch', address: '654 Maple Rd', area: 'Westside', distance: '2.5 mi', phone: '(555) 567-8901' }
];

const LocationSelector = ({ selectedLocation, onLocationChange, style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    selectedLocation || availableLocations[0]
  );

  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
    setModalVisible(false);
    if (onLocationChange) {
      onLocationChange(location);
    }
  };

  const renderLocationItem = ({ item }) => {
    const isSelected = currentLocation.id === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.locationItem, isSelected && styles.selectedLocationItem]}
        onPress={() => handleLocationSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.locationItemLeft}>
          <Ionicons 
            name="location" 
            size={20} 
            color={isSelected ? "#000000" : "#666666"} 
          />
          <View style={styles.locationItemText}>
            <Text style={[
              styles.locationName,
              isSelected && styles.selectedLocationName
            ]}>
              {item.name}
            </Text>
                         <Text style={styles.locationArea}>{item.address} • {item.distance}</Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark" size={20} color="#000000" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.selectorContent}>
          <Ionicons name="location-outline" size={18} color="#000000" />
          <View style={styles.locationInfo}>
            <Text style={styles.deliverToText}>Restaurant Location</Text>
            <Text style={styles.currentLocationText}>{currentLocation.name}</Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={16} color="#666666" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Restaurant Location</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={availableLocations}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.locationList}
            />

            <TouchableOpacity
              style={styles.addLocationButton}
              onPress={() => {
                setModalVisible(false);
                Alert.alert('Add New Location', 'This feature will be available soon!');
              }}
            >
              <Ionicons name="add" size={20} color="#000000" />
              <Text style={styles.addLocationText}>Suggest New Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationInfo: {
    marginLeft: 8,
  },
  deliverToText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
  },
  currentLocationText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  locationList: {
    paddingHorizontal: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedLocationItem: {
    backgroundColor: '#F8F8F8',
    borderColor: '#000000',
  },
  locationItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationItemText: {
    marginLeft: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  selectedLocationName: {
    fontWeight: '600',
  },
  locationArea: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  addLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addLocationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 8,
  },
});

export default LocationSelector; 