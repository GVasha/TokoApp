export const restaurantData = [

  {
    id: 2,
    name: "Burger House",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "$1.99",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
    description: "Gourmet burgers made with premium beef",
    distance: "1.2 mi",
    priceRange: "$"
  },
  {
    id: 3,
    name: "Pizza Corner",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "$3.49",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop",
    description: "Wood-fired pizza with authentic Italian flavors",
    distance: "2.1 mi",
    priceRange: "$$"
  },
  {
    id: 4,
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "35-45 min",
    deliveryFee: "$4.99",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop",
    description: "Fresh sushi and traditional Japanese dishes",
    distance: "1.5 mi",
    priceRange: "$$$"
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.49",
    image: "https://images.unsplash.com/photo-1565299585323-38dd9ba6a1a1?w=400&h=250&fit=crop",
    description: "Authentic Mexican tacos and burritos",
    distance: "0.9 mi",
    priceRange: "$"
  },
  {
    id: 6,
    name: "Noodle Bar",
    cuisine: "Asian",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=250&fit=crop",
    description: "Handmade noodles and Asian comfort food",
    distance: "1.8 mi",
    priceRange: "$$"
  },
  {
    id: 7,
    name: "Healthy Bowls",
    cuisine: "Healthy",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: "$3.99",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
    description: "Fresh salad bowls and healthy options",
    distance: "1.1 mi",
    priceRange: "$$"
  },
  {
    id: 8,
    name: "Coffee & Pastries",
    cuisine: "Cafe",
    rating: 4.2,
    deliveryTime: "10-20 min",
    deliveryFee: "$1.49",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop",
    description: "Artisan coffee and freshly baked pastries",
    distance: "0.5 mi",
    priceRange: "$"
  },
  {
    id: 9,
    name: "BBQ Smokehouse",
    cuisine: "BBQ",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "$3.99",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop",
    description: "Slow-smoked meats and traditional BBQ sides",
    distance: "2.3 mi",
    priceRange: "$$"
  },
  {
    id: 10,
    name: "Thai Garden",
    cuisine: "Thai",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99",
    image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=250&fit=crop",
    description: "Authentic Thai cuisine with bold flavors",
    distance: "1.7 mi",
    priceRange: "$$"
  }
];

// Function to generate more restaurants for infinite scroll
export const generateMoreRestaurants = (startId = 11) => {
  const cuisines = ["Italian", "Chinese", "Indian", "Mediterranean", "Vietnamese", "Korean", "French", "Greek"];
  const names = ["Bistro", "Kitchen", "House", "Corner", "Palace", "Garden", "Express", "Grill"];
  const adjectives = ["Royal", "Golden", "Fresh", "Spicy", "Crispy", "Tasty", "Delicious", "Premium"];
  
  return Array.from({ length: 10 }, (_, index) => {
    const id = startId + index;
    const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
    const name = adjectives[Math.floor(Math.random() * adjectives.length)];
    const place = names[Math.floor(Math.random() * names.length)];
    
    return {
      id,
      name: `${name} ${cuisine} ${place}`,
      cuisine,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      deliveryTime: `${Math.floor(Math.random() * 20) + 15}-${Math.floor(Math.random() * 20) + 35} min`,
      deliveryFee: `$${(Math.random() * 3 + 1.99).toFixed(2)}`,
      image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=250&fit=crop`,
      description: `Delicious ${cuisine.toLowerCase()} food with authentic flavors`,
      distance: `${(Math.random() * 3 + 0.5).toFixed(1)} mi`,
      priceRange: ["$", "$$", "$$$"][Math.floor(Math.random() * 3)]
    };
  });
}; 