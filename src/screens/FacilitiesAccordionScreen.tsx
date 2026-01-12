import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const FacilitiesAccordionScreen = ({ navigation }: any) => {
  const [open, setOpen] = useState('food');
  const animatedControllers = useRef<{ [key: string]: Animated.Value }>({}).current;

  FACILITY_DATA.forEach(item => {
    if (!animatedControllers[item.key]) {
      animatedControllers[item.key] = new Animated.Value(item.key === open ? 1 : 0);
    }
  });

  useEffect(() => {
    FACILITY_DATA.forEach(item => {
      Animated.timing(animatedControllers[item.key], {
        toValue: item.key === open ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  }, [open]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="#0F1831" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Facilities</Text>
        <View style={{ width: 22 }} />
      </View>
      <FlatList
        data={FACILITY_DATA}
        keyExtractor={item => item.key}
        renderItem={({ item }) => {
          const height = animatedControllers[item.key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, item.details.length * 28 + 10],
          });
          const opacity = animatedControllers[item.key];
          return (
            <View style={[styles.card, open === item.key && styles.cardOpen]}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setOpen(open === item.key ? '' : item.key)}
                activeOpacity={0.8}
              >
                <Icon name={item.icon} size={22} color="#171725" style={styles.icon} />
                <Text style={styles.cardTitle}>{item.title} <Text style={styles.count}>({item.count} facilities)</Text></Text>
                <View style={{ flex: 1 }} />
                <Icon name={open === item.key ? 'minus' : 'plus'} size={22} color="#171725" />
              </TouchableOpacity>
              <Animated.View style={[styles.detailsBox, { height, opacity, overflow: 'hidden' }]}> 
                {item.details.map((d, i) => (
                  <View key={i} style={styles.detailRow}>
                    <View style={styles.bullet} />
                    <Text style={styles.detailText}>{d}</Text>
                  </View>
                ))}
              </Animated.View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },
  card: {
    backgroundColor: '#F8FCF8',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  cardOpen: {
    backgroundColor: '#F8FCF8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
  },
  count: {
    fontSize: 13,
    color: '#8C95A8',
    fontFamily: 'Poppins-Regular',
  },
  detailsBox: {
    marginTop: 14,
    marginLeft: 34,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B5E4CA',
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#0F1831',
    fontFamily: 'Poppins-Regular',
  },
});

export default FacilitiesAccordionScreen;
