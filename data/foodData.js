export const foodCategories = [
  {
    id: 1,
    name: "Popular",
    dishes: [
      {
        id: 1,
        name: "Chicken Shawarma Wrap",
        description: "Tender chicken with garlic sauce, pickles, and fresh vegetables",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
        category: "Popular",
        preparationTime: "15-20 min"
      },
      {
        id: 2,
        name: "Beef Shawarma Plate",
        description: "Seasoned beef with rice, hummus, and fresh salad",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop",
        category: "Popular",
        preparationTime: "20-25 min"
      },
      {
        id: 3,
        name: "Mixed Grill Platter",
        description: "Combination of chicken, beef, and lamb with sides",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
        category: "Popular",
        preparationTime: "25-30 min"
      }
    ]
  },
  {
    id: 2,
    name: "Wraps",
    dishes: [
      {
        id: 4,
        name: "Lamb Shawarma Wrap",
        description: "Tender lamb with tahini sauce and fresh vegetables",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
        category: "Wraps",
        preparationTime: "15-20 min"
      },
      {
        id: 5,
        name: "Falafel Wrap",
        description: "Crispy falafel with hummus and fresh vegetables",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=300&h=200&fit=crop",
        category: "Wraps",
        preparationTime: "10-15 min"
      },
      {
        id: 6,
        name: "Grilled Chicken Wrap",
        description: "Marinated grilled chicken with garlic sauce",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
        category: "Wraps",
        preparationTime: "12-18 min"
      }
    ]
  },
  {
    id: 3,
    name: "Platters",
    dishes: [
      {
        id: 7,
        name: "Chicken Shawarma Platter",
        description: "Chicken shawarma with rice, salad, and hummus",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop",
        category: "Platters",
        preparationTime: "20-25 min"
      },
      {
        id: 8,
        name: "Vegetarian Platter",
        description: "Falafel, hummus, baba ganoush, and fresh salad",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
        category: "Platters",
        preparationTime: "15-20 min"
      },
      {
        id: 9,
        name: "Family Feast Platter",
        description: "Large platter with mixed meats, sides, and bread",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
        category: "Platters",
        preparationTime: "30-35 min"
      }
    ]
  },
  {
    id: 4,
    name: "Sides",
    dishes: [
      {
        id: 10,
        name: "Hummus & Pita",
        description: "Fresh hummus served with warm pita bread",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=200&fit=crop",
        category: "Sides",
        preparationTime: "5-10 min"
      },
      {
        id: 11,
        name: "Stuffed Grape Leaves",
        description: "Rice-stuffed grape leaves with herbs and spices",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
        category: "Sides",
        preparationTime: "8-12 min"
      },
      {
        id: 12,
        name: "Crispy Falafel (6 pcs)",
        description: "Freshly made crispy falafel with tahini sauce",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=300&h=200&fit=crop",
        category: "Sides",
        preparationTime: "10-15 min"
      }
    ]
  }
];

export const restaurantInfo = {
  id: 1,
  name: "Shawarma Palace",
  cuisine: "Middle Eastern",
  rating: 4.8,
  deliveryTime: "25-35 min",
  deliveryFee: 2.99,
  minimumOrder: 15.00,
  description: "Authentic Middle Eastern cuisine with fresh ingredients",
  address: "123 Main Street, Downtown",
  phone: "(555) 123-4567"
}; 