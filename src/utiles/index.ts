export const recommended = [
  {
    id: '1',
    title: 'Serenity Sands',
    location: 'Honolulu, HI',
    price: '$270 /night',
    rating: '4.0',
    image:
      'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Azure Bay Resort',
    location: 'Malibu, CA',
    price: '$320 /night',
    rating: '4.5',
    image:
      'https://ak-d.tripcdn.com/images/0202j120009qrjruu8E5D_Z_320_220_R5_D.webp',
  },
  {
    id: '3',
    title: 'Palm Crest Villas',
    location: 'Miami, FL',
    price: '$245 /night',
    rating: '4.2',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHinrTgyjlHSvGS8BOOI6Vg8GB4vDQSqr6Q&s',
  },
  {
    id: '4',
    title: 'Golden Dunes Retreat',
    location: 'Dubai, UAE',
    price: '$410 /night',
    rating: '4.8',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBujiGAamOqR1lZWWnYr9WacPwAt702ZuJmw&s',
  },
  {
    id: '5',
    title: 'Alpine Haven Lodge',
    location: 'Zermatt, Switzerland',
    price: '$295 /night',
    rating: '4.6',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVY9XXa8ADGFBykqEdtjvRMJcjxnhF1Is5MQ&s',
  },
];

export const mockHotels = [
  {
    id: '1',
    title: 'Elysian Suites',
    location: 'San Diego, CA',
    price: '$320/night',
    rating: '4.7',
    image: 'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: 32.7157,
    longitude: -117.1611,
  },
  {
    id: '2',
    title: 'Opal Grove Inn',
    location: 'San Diego, CA',
    price: '$190/night',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: 32.7050,
    longitude: -117.1550,
  },
  {
    id: '3',
    title: 'Palm Breeze Villa',
    location: 'San Diego, CA',
    price: '$280/night',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: 32.7250,
    longitude: -117.1700,
  },
  {
    id: '4',
    title: 'Coastal Retreat',
    location: 'San Diego, CA',
    price: '$350/night',
    rating: '4.4',
    image: 'https://images.unsplash.com/photo-1535930891776-0ac7c9024fd5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    latitude: 32.7100,
    longitude: -117.1450,
  },
];

export const mockBookingDetail = {
  id: '1',
  name: 'The Aston Villa Hotel',
  location: {
    latitude:  52.509,
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
