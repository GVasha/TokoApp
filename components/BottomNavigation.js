import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
    { id: 'search', icon: 'search-outline', activeIcon: 'search', label: 'Search' },
    { id: 'orders', icon: 'receipt-outline', activeIcon: 'receipt', label: 'Orders' },
    { id: 'profile', icon: 'person-outline', activeIcon: 'person', label: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? '#000000' : '#666666'}
              />
              <Text style={[
                styles.tabLabel,
                { color: isActive ? '#000000' : '#666666' }
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default BottomNavigation; 