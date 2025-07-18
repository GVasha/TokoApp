import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { orderHistory, getTotalSpent, getFavoriteRestaurant } from '../data/orderData';

const OrderHistoryScreen = ({ navigation }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleReorder = (order) => {
    setModalVisible(false);
    Alert.alert(
      'Reorder',
      `Would you like to reorder from ${order.restaurant}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reorder', 
          onPress: () => {
            Alert.alert('Order Added', 'Items have been added to your cart!');
            navigation.navigate('RestaurantFeed');
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#4CAF50';
      case 'preparing': return '#FF9800';
      case 'on the way': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return '#666666';
    }
  };

  const renderOrderItem = ({ item: order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => handleOrderPress(order)}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <Text style={styles.restaurantName} numberOfLines={1}>
        {order.restaurant}
      </Text>

      <View style={styles.orderSummary}>
        <Text style={styles.itemCount}>
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
      </View>

      <View style={styles.orderFooter}>
        <TouchableOpacity
          style={styles.reorderButton}
          onPress={() => handleReorder(order)}
        >
          <Ionicons name="refresh" size={16} color="#000000" />
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#666666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Order History</Text>
      
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Ionicons name="receipt" size={24} color="#000000" />
        <Text style={styles.statNumber}>{orderHistory.length}</Text>
        <Text style={styles.statLabel}>Total Orders</Text>
      </View>
      
      <View style={styles.statCard}>
        <Ionicons name="card" size={24} color="#000000" />
        <Text style={styles.statNumber}>${getTotalSpent().toFixed(2)}</Text>
        <Text style={styles.statLabel}>Total Spent</Text>
      </View>
      
      <View style={styles.statCard}>
        <Ionicons name="heart" size={24} color="#000000" />
        <Text style={styles.statNumber} numberOfLines={1}>Shawarma</Text>
        <Text style={styles.statLabel}>Favorite</Text>
      </View>
    </View>
  );

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.orderDetailHeader}>
                <Text style={styles.detailOrderNumber}>{selectedOrder.orderNumber}</Text>
                <View style={[styles.detailStatusBadge, { backgroundColor: getStatusColor(selectedOrder.status) }]}>
                  <Text style={styles.detailStatusText}>{selectedOrder.status}</Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Restaurant</Text>
                <Text style={styles.sectionContent}>{selectedOrder.restaurant}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Order Date & Time</Text>
                <Text style={styles.sectionContent}>{selectedOrder.date} at {selectedOrder.time}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <Text style={styles.sectionContent}>{selectedOrder.deliveryAddress}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Items Ordered</Text>
                {selectedOrder.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalAmount}>${selectedOrder.total.toFixed(2)}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.reorderModalButton}
                onPress={() => handleReorder(selectedOrder)}
              >
                <Ionicons name="refresh" size={20} color="#FFFFFF" />
                <Text style={styles.reorderModalText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        
        <FlatList
          data={orderHistory}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderStats}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
        
        {renderOrderDetails()}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  filterButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  restaurantName: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '500',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#666666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  reorderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
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
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  orderDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailOrderNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  detailStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailStatusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  totalSection: {
    borderTopWidth: 2,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  reorderModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 8,
  },
  reorderModalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default OrderHistoryScreen; 