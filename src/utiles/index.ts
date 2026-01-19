export const recommended = [
  {
    id: '1',
    title: 'Serenity Sands',
    location: 'Honolulu, HI',
    price: '$30 ',
    rating: '4.0',
    image:
      'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Azure Bay Resort',
    location: 'Malibu, CA',
    price: '$25 ',
    rating: '4.5',
    image:
      'https://ak-d.tripcdn.com/images/0202j120009qrjruu8E5D_Z_320_220_R5_D.webp',
  },
  {
    id: '3',
    title: 'Palm Crest Villas',
    location: 'Miami, FL',
    price: '$40 ',
    rating: '4.2',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHinrTgyjlHSvGS8BOOI6Vg8GB4vDQSqr6Q&s',
  },
  {
    id: '4',
    title: 'Golden Dunes Retreat',
    location: 'Dubai, UAE',
    price: '$60 ',
    rating: '4.8',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBujiGAamOqR1lZWWnYr9WacPwAt702ZuJmw&s',
  },
  {
    id: '5',
    title: 'Alpine Haven Lodge',
    location: 'Zermatt, Switzerland',
    price: '$55',
    rating: '4.6',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVY9XXa8ADGFBykqEdtjvRMJcjxnhF1Is5MQ&s',
  },
];

export const mockHotels = [
  {
    id: '1',
    title: 'The Aston Villa Hotel',
    location: {
      latitude: 52.509,
      longitude: -1.884,
      location: 'Rome, NY'
    },
    address: '9175 Chestnut Street, Rome, NY 13440',
    price: 220,
    rating: 4.6,
    bed: 2,
    bath: 2,
    image: 'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf',
    facilities: [
      { key: 'ac', label: 'AC', icon: 'air-conditioner' },
      { key: 'restaurant', label: 'Restaurant', icon: 'silverware-fork-knife' },
      { key: 'pool', label: 'Swimming Pool', icon: 'pool' },
      { key: 'frontdesk', label: '24h Front Desk', icon: 'clock-outline' }
    ],
    description:
      'A luxury hotel located in the heart of Rome, NY offering premium rooms, modern amenities, and exceptional service.',
    reviews: [
      {
        id: 'r1',
        name: 'Kim Borrrdy',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.5,
        text: 'Room was spacious and very clean. Definitely coming back.'
      },
      {
        id: 'r2',
        name: 'Mirai Kamazuki',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'Excellent service and great location.'
      }
    ]
  },

  {
    id: '2',
    title: 'Opal Grove Inn',
    location: {
      latitude: 32.7157,
      longitude: -117.1611,
      location: 'San Diego, CA'
    },
    address: '450 Harbor Drive, San Diego, CA 92101',
    price: 190,
    rating: 4.5,
    bed: 1,
    bath: 1,
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16',
    facilities: [
      { key: 'ac', label: 'AC', icon: 'air-conditioner' },
      { key: 'restaurant', label: 'Restaurant', icon: 'silverware-fork-knife' },
      { key: 'pool', label: 'Swimming Pool', icon: 'pool' },
      { key: 'frontdesk', label: '24h Front Desk', icon: 'clock-outline' }
    ],
    description:
      'A cozy inn offering comfort and convenience near downtown San Diego and local attractions.',
    reviews: [
      {
        id: 'r1',
        name: 'Alex Turner',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        rating: 4.3,
        text: 'Good value for money and friendly staff.'
      }
    ]
  },

  {
    id: '3',
    title: 'Palm Breeze Villa',
    location: {
      latitude: 32.725,
      longitude: -117.17,
      location: 'San Diego, CA'
    },
    address: '88 Sunset Blvd, San Diego, CA 92103',
    price: 280,
    rating: 4.6,
    bed: 2,
    bath: 2,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    facilities: [
      { key: 'ac', label: 'AC', icon: 'air-conditioner' },
      { key: 'restaurant', label: 'Restaurant', icon: 'silverware-fork-knife' },
      { key: 'pool', label: 'Swimming Pool', icon: 'pool' },
      { key: 'frontdesk', label: '24h Front Desk', icon: 'clock-outline' }
    ],
    description:
      'A private villa with palm views, perfect for couples or small families looking for relaxation.',
    reviews: [
      {
        id: 'r1',
        name: 'Emily Clark',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
        rating: 4.7,
        text: 'Loved the peaceful environment and beautiful decor.'
      }
    ]
  },

  {
    id: '4',
    title: 'Coastal Retreat',
    location: {
      latitude: 32.71,
      longitude: -117.145,
      location: 'San Diego, CA'
    },
    address: '120 Ocean Drive, San Diego, CA 92109',
    price: 350,
    rating: 4.4,
    bed: 3,
    bath: 2,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    facilities: [
      { key: 'ac', label: 'AC', icon: 'air-conditioner' },
      { key: 'restaurant', label: 'Restaurant', icon: 'silverware-fork-knife' },
      { key: 'pool', label: 'Swimming Pool', icon: 'pool' },
      { key: 'frontdesk', label: '24h Front Desk', icon: 'clock-outline' }
    ],
    description:
      'A spacious coastal home with ocean views, ideal for family vacations.',
    reviews: [
      {
        id: 'r1',
        name: 'Sarah Miles',
        avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
        rating: 4.4,
        text: 'Amazing location and beautiful view.'
      }
    ]
  },

  {
    id: '5',
    title: 'Oceanview Escape',
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
      location: 'Miami, FL'
    },
    address: '77 Collins Ave, Miami Beach, FL 33139',
    price: 870,
    rating: 4.9,
    bed: 3,
    bath: 2,
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8',
    facilities: [
      { key: 'pool', label: 'Infinity Pool', icon: 'pool' },
      { key: 'spa', label: 'Spa', icon: 'spa' },
      { key: 'gym', label: 'Gym', icon: 'dumbbell' }
    ],
    description:
      'A premium beachfront escape offering luxury, privacy, and breathtaking ocean views.',
    reviews: [
      {
        id: 'r1',
        name: 'Daniel Woods',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        rating: 5,
        text: 'Worth every dollar. Absolute luxury.'
      }
    ]
  }
]


export const mockBookingDetail = {
  id: '1',
  name: 'The Aston Villa Hotel',
  location: {
    latitude: 52.509,
    longitude: -1.884,
    location: 'Rome, NY'
  },
  rating: 4.6,
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  price: 120,
  address: '9175 Chestnut StreetRome, NY 13440',
  mapImage: 'https://maps.googleapis.com/maps/api/staticmap?center=Haight+St&zoom=15&size=400x200&key=YOUR_API_KEY',
  facilities: [
    { key: 'ac', label: 'Ac', icon: 'air-conditioner' },
    { key: 'restaurant', label: 'Restaurant', icon: 'silverware-fork-knife' },
    { key: 'pool', label: 'Swimming Pool', icon: 'pool' },
    { key: 'frontdesk', label: '24-Hours Front Desk', icon: 'clock-outline' },
  ],
  description: 'Located in the heart of Rome, NY, The Aston Villa Hotel offers luxurious accommodations with stunning views of the city skyline. Enjoy our top-notch facilities including a rooftop pool, gourmet restaurant, and state-of-the-art fitness center. Whether you are here for business or leisure, our dedicated staff is committed to making your stay unforgettable.',
  reviews: [
    {
      id: 'r1',
      name: 'Kim Borrrdy',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.5,
      text: 'Amazing!  The room is good than the picture. Thanks for amazing experience!'
    },
    {
      id: 'r2',
      name: 'Mirai Kamazuki',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5.0,
      text: 'The service is on point, and I really like the facilities. Good job!'
    }
  ],
  recommendations: [
    {
      id: 'rec1',
      name: 'Lumière Palace',
      location: 'Las Vegas, NV',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
      rating: 4.4,
      price: 210,
      oldPrice: 345
    }
  ]
};

export
  const FACILITY_DATA = [
    {
      key: 'food',
      title: 'Food and Drink',
      count: 4,
      icon: 'silverware-fork-knife',
      details: [
        'A la carte dinner',
        'A la carte lunch',
        'Breakfast',
        'Vegetarian meal',
      ],
    },
    {
      key: 'transport',
      title: 'Transportation',
      count: 5,
      icon: 'car',
      details: [
        'Airport shuttle',
        'Car hire',
        'Bicycle rental',
        'Parking',
        'Taxi service',
      ],
    },
    {
      key: 'general',
      title: 'General',
      count: 8,
      icon: 'cog',
      details: [
        'Non-smoking rooms',
        'Lift',
        'Air conditioning',
        'Heating',
        'Family rooms',
        'Soundproof rooms',
        'Allergy-free room',
        'Designated smoking area',
      ],
    },
    {
      key: 'hotel',
      title: 'Hotel Service',
      count: 2,
      icon: 'bed',
      details: [
        '24-hour front desk',
        'Room service',
      ],
    },
    {
      key: 'business',
      title: 'Bussines Facilities',
      count: 6,
      icon: 'briefcase',
      details: [
        'Meeting/banquet facilities',
        'Business centre',
        'Fax/photocopying',
        'Conference rooms',
        'Projector',
        'WiFi',
      ],
    },
    {
      key: 'nearby',
      title: 'Nearby facilities',
      count: 8,
      icon: 'map-marker-radius',
      details: [
        'ATM',
        'Shops',
        'Supermarket',
        'Pharmacy',
        'Bank',
        'Restaurant',
        'Bar',
        'Park',
      ],
    },
    {
      key: 'kids',
      title: 'Kids',
      count: 3,
      icon: 'baby-face-outline',
      details: [
        'Kids club',
        'Children playground',
        'Babysitting',
      ],
    },
    {
      key: 'connectivity',
      title: 'Connectivity',
      count: 2,
      icon: 'wifi',
      details: [
        'Free WiFi',
        'Internet services',
      ],
    },
    {
      key: 'public',
      title: 'Public Facilities',
      count: 16,
      icon: 'domain',
      details: [
        'Garden',
        'Terrace',
        'Sun terrace',
        'Outdoor furniture',
        'Shared lounge/TV area',
        'Library',
        'Chapel/shrine',
        'Picnic area',
        'BBQ facilities',
        'Swimming pool',
        'Fitness centre',
        'Spa and wellness centre',
        'Sauna',
        'Hot tub/jacuzzi',
        'Massage',
        'Steam room',
      ],
    },
  ];