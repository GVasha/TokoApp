export const orderHistory = [
  {
    id: 1,
    orderNumber: '#ORD-2024-001',
    date: '2024-01-15',
    time: '2:30 PM',
    restaurant: 'Shawarma Palace - Downtown Branch',
    items: [
      { name: 'Chicken Shawarma Wrap', quantity: 2, price: 12.99 },
      { name: 'Hummus & Pita', quantity: 1, price: 8.99 }
    ],
    total: 34.97,
    status: 'Delivered',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: 2,
    orderNumber: '#ORD-2024-002',
    date: '2024-01-12',
    time: '7:45 PM',
    restaurant: 'Shawarma Palace - Midtown Branch',
    items: [
      { name: 'Beef Shawarma Plate', quantity: 1, price: 16.99 },
      { name: 'Falafel Wrap', quantity: 1, price: 11.99 },
      { name: 'Baklava', quantity: 2, price: 4.99 }
    ],
    total: 38.96,
    status: 'Delivered',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: 3,
    orderNumber: '#ORD-2024-003',
    date: '2024-01-08',
    time: '12:15 PM',
    restaurant: 'Shawarma Palace - Downtown Branch',
    items: [
      { name: 'Mixed Grill Platter', quantity: 1, price: 24.99 },
      { name: 'Garlic Sauce', quantity: 2, price: 1.99 }
    ],
    total: 28.97,
    status: 'Delivered',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: 4,
    orderNumber: '#ORD-2024-004',
    date: '2024-01-05',
    time: '6:20 PM',
    restaurant: 'Shawarma Palace - Uptown Branch',
    items: [
      { name: 'Vegetarian Platter', quantity: 1, price: 13.99 },
      { name: 'Lemonade', quantity: 2, price: 3.99 }
    ],
    total: 21.97,
    status: 'Delivered',
    deliveryAddress: '123 Main St, Apt 4B'
  },
  {
    id: 5,
    orderNumber: '#ORD-2024-005',
    date: '2024-01-02',
    time: '1:45 PM',
    restaurant: 'Shawarma Palace - Riverside Branch',
    items: [
      { name: 'Chicken Shawarma Plate', quantity: 1, price: 15.99 },
      { name: 'Tabbouleh Salad', quantity: 1, price: 7.99 }
    ],
    total: 25.97,
    status: 'Delivered',
    deliveryAddress: '123 Main St, Apt 4B'
  }
];

export const getOrderById = (orderId) => {
  return orderHistory.find(order => order.id === orderId);
};

export const getRecentOrders = (limit = 3) => {
  return orderHistory.slice(0, limit);
};

export const getTotalSpent = () => {
  return orderHistory.reduce((total, order) => total + order.total, 0);
};

export const getFavoriteRestaurant = () => {
  const restaurantCounts = {};
  orderHistory.forEach(order => {
    const restaurant = order.restaurant.split(' - ')[0]; // Get base restaurant name
    restaurantCounts[restaurant] = (restaurantCounts[restaurant] || 0) + 1;
  });
  
  return Object.entries(restaurantCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'No orders yet';
}; 