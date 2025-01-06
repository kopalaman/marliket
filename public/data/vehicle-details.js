export const vehicleData = {
  // Basic Info
  stockNo: 'BW601672',
  category: 'SUV',
  condition: 'Used',
  type: 'HYBRID',
  price: 14860,
  totalPrice: 17281,
  destination: 'DAR ES SALAAM (RORO)',
  pointsReward: 60,


  // Gallery Images
  gallery: [
    "/images/top-boats/boat-thirty-one.jpg",
    "/images/top-boats/boat-twenty-two.jpg",
    "/images/top-boats/boat-twenty-three.jpg",
    "/images/top-boats/boat-twelve.png",
    "/images/top-boats/boat-thirteen.png",
    "/images/top-boats/boat-forteen.png",
    "/images/top-boats/boat-fifteen.png",
    "/images/top-boats/boat-sixteen.png",
    "/images/top-boats/boat-seventeen.png",
    "/images/top-boats/boat-eighteen.png",
    "/images/top-boats/boat-nineteen.png",
    "/images/top-boats/boat-one.jpg",
    "/images/top-boats/boat-two.jpg",
    "/images/top-boats/boat-three.jpg",
    "/images/top-boats/boat-four.jpg",
    "/images/top-boats/boat-five.jpg",
    // ... keep other images
  ],

  // Vehicle Details
  vehicleDetails: {
    make: 'Mercedes-Benz',
    model: 'GLE 450',
    year: 2024,
    mileage: 15250,
    engineSize: '2,000cc',
    engineCode: '-',
    transmission: 'Automatic',
    fuel: 'Hybrid(Petrol)',
    chassisNo: 'HNT32-181070',
    bodyStyle: 'SUV',
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Macchiato Beige',
    steering: 'Right',
    seats: 5,
    doors: 5,
    location: 'YOKOHAMA',
    refNo: 'BW601672',
    vin: 'WDC0G8DB0LF679237',
    stock: 3
  },

  // Quick Stats (for the icon cards)
  quickStats: [
    {
      label: 'Mileage',
      value: '26,087 km',
      icon: 'Gauge'
    },
    {
      label: 'Year',
      value: '2020/1',
      icon: 'Calendar'
    },
    {
      label: 'Engine',
      value: '2,000cc',
      icon: 'Settings2'
    },
    {
      label: 'Fuel',
      value: 'Hybrid',
      icon: 'Fuel'
    }
  ],

  // Features with availability status
  features: [
    {
      name: 'Air Conditioning',
      available: true,
      category: 'comfort'
    },
    {
      name: 'Power Steering',
      available: true,
      category: 'mechanical'
    },
    {
      name: 'Power Windows',
      available: true,
      category: 'comfort'
    },
    {
      name: 'ABS',
      available: true,
      category: 'safety'
    },
    {
      name: 'Airbag',
      available: true,
      category: 'safety'
    },
    {
      name: 'Navigation',
      available: true,
      category: 'entertainment'
    },
    {
      name: 'Backup Camera',
      available: true,
      category: 'safety'
    },
    {
      name: 'Keyless Entry',
      available: true,
      category: 'convenience'
    },
    {
      name: 'Sunroof',
      available: false,
      category: 'comfort'
    },
    {
      name: 'Leather Seats',
      available: true,
      category: 'interior'
    },
    {
      name: '360 Camera',
      available: false,
      category: 'safety'
    },
    {
      name: 'Apple CarPlay',
      available: true,
      category: 'entertainment'
    }
  ],

  // Technical Specifications
  specifications: {
    performance: [
      {
        name: 'Engine',
        details: '2.0L Hybrid'
      },
      {
        name: 'Horsepower',
        details: '385 hp @ 5,800 rpm'
      },
      {
        name: 'Torque',
        details: '384 lb-ft @ 2,000 rpm'
      },
      {
        name: 'Transmission',
        details: '8-Speed Automatic'
      }
    ],
    dimensions: [
      {
        name: 'Length',
        details: '194.9 inches'
      },
      {
        name: 'Wheelbase',
        details: '115.0 inches'
      },
      {
        name: 'Ground Clearance',
        details: '8.2 inches'
      }
    ],
    fuel: [
      {
        name: 'Fuel Economy',
        details: '20 city / 27 highway'
      },
      {
        name: 'Fuel Tank',
        details: '19.8 gallons'
      },
      {
        name: 'Fuel Type',
        details: 'Hybrid(Petrol)'
      }
    ]
  },

  // Seller Information
  seller: {
    name: 'Premium Auto Sales',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    verifiedDealer: true,
    memberSince: '2018',
    location: 'YOKOHAMA',
    responseRate: 95,
    responseTime: 'Within an hour',
    totalListings: 1234,
    totalReviews: 128,
    rating: 4.8,
    reviews: {
      overall: 4.8,
      communication: 4.9,
      pricing: 4.7,
      experience: 4.8
    }
  },

  reviews: {
    totalCount: 128, // Using seller.totalReviews
    averageRating: 4.8, // Using seller.rating
    ratingBreakdown: {
      5: 98,  // Calculated based on total reviews and average rating
      4: 20,
      3: 7,
      2: 2,
      1: 1
    },
    reviews: [
      {
        id: '1',
        user: {
          name: 'John Smith',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          location: 'California, USA'
        },
        rating: 5,
        date: '2024-02-15',
        comment: "Outstanding vehicle and exceptional service from Premium Auto Sales. The Mercedes GLE 450 exceeded my expectations in terms of performance and luxury. The hybrid system provides excellent fuel economy without compromising power.",
        pros: [
          'Excellent fuel efficiency',
          'Premium interior quality',
          'Smooth hybrid transition',
          'Advanced safety features'
        ],
        cons: [
          'Learning curve for tech features'
        ],
        verified: true,
        helpful: 24
      },
      {
        id: '2',
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          location: 'Toronto, Canada'
        },
        rating: 4,
        date: '2024-01-28',
        comment: "Very satisfied with my purchase. The vehicle was exactly as described, and Premium Auto Sales was professional throughout the entire process. The hybrid system works flawlessly.",
        pros: [
          'Great condition',
          'Responsive dealer',
          'Smooth transaction'
        ],
        cons: [
          'Shipping took longer than expected',
          'Some minor scratches not visible in photos'
        ],
        verified: true,
        helpful: 15
      },
      {
        id: '3',
        user: {
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          location: 'Singapore'
        },
        rating: 5,
        date: '2024-01-15',
        comment: "Perfect experience from start to finish. The dealer was very transparent about the vehicle's condition and history. The GLE's performance and features are impressive.",
        pros: [
          'Honest dealer communication',
          'Vehicle as described',
          'Quick delivery',
          'Excellent vehicle condition'
        ],
        verified: true,
        helpful: 19
      },
      {
        id: '4',
        user: {
          name: 'Emma Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          location: 'Dubai, UAE'
        },
        rating: 5,
        date: '2024-01-02',
        comment: "The hybrid system performs exceptionally well, and the fuel economy is impressive for a vehicle of this size. Premium Auto Sales provided excellent service throughout the purchase process.",
        pros: [
          'Amazing hybrid performance',
          'Luxurious interior',
          'Great fuel economy'
        ],
        cons: [
          'Initial software setup was complex'
        ],
        verified: true,
        helpful: 12
      }
    ],
    sellerRatings: {
      overall: 4.8,
      communication: 4.9,
      pricing: 4.7,
      experience: 4.8
    }
  },

  // Purchase Flow Steps
  purchaseFlow: [
    {
      step: 1,
      title: 'ORDER',
      description: 'Receive a quote and confirm your order',
      icon: 'ShoppingCart'
    },
    {
      step: 2,
      title: 'PAYMENT',
      description: 'Choose your payment method',
      icon: 'CreditCard'
    },
    {
      step: 3,
      title: 'SHIPMENT',
      description: 'Vehicle preparation and shipping',
      icon: 'Ship'
    },
    {
      step: 4,
      title: 'DELIVERY',
      description: 'Receive your vehicle',
      icon: 'Package'
    }
  ],

  // Detailed Description
  description: "Experience luxury and performance with this meticulously maintained vehicle. Features include premium leather interior, panoramic sunroof, and advanced driver assistance systems. The powerful engine delivers exceptional performance while maintaining excellent fuel efficiency.",

  // Payment Methods
  paymentMethods: [
    {
      name: 'Bank Transfer',
      icon: 'bank-transfer.svg'
    },
    {
      name: 'Credit Card',
      icon: 'credit-card.svg'
    },
    {
      name: 'PayPal',
      icon: 'paypal.svg'
    }
  ],

  // Similar Vehicles (for carousel)
  similarVehicles: [
    {
      id: '1',
      title: '2020 NISSAN X-TRAIL HYBRID',
      price: 15040,
      totalPrice: 17363,
      image: '/images/top-boats/boat-one.jpg',
      mileage: '26,087 km',
      year: '2020',
      points: 60
    },
    // ... add more similar vehicles
  ]
}