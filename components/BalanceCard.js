import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BalanceCard = ({ balance, onAddFunds }) => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceInfo}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddFunds}>
        <Ionicons name="add" size={20} color="#000000" />
        <Text style={styles.addButtonText}>Add Funds</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButtonText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default BalanceCard; 