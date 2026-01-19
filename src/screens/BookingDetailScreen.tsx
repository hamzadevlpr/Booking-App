import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SwimIcon from '../assets/icons/swim.svg';
import ResturantIcon from '../assets/icons/building.svg';
import WindIcon from '../assets/icons/wind.svg';
import SupportIcon from '../assets/icons/24-support.svg';
import MapCard from '../components/MapCard';
import { mockBookingDetail } from '../utiles';

const PRIMARY = '#2853AF';
const HEADER_IMAGE_HEIGHT = 270;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 88 : 72;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const BookingDetailScreen = ({ route, navigation }: any) => {
  const { hotel } = route.params;
  console.log('Hotel Details:', hotel);

  const scrollY = useRef(new Animated.Value(0)).current;
  const data = mockBookingDetail;

  // State for description collapse/expand
  const [descExpanded, setDescExpanded] = useState(false);

  // Handler to open Google Maps
  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${data.location.latitude},${data.location.longitude}`;
    Linking.openURL(url);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [HEADER_IMAGE_HEIGHT - 80, HEADER_IMAGE_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [HEADER_IMAGE_HEIGHT - 80, HEADER_IMAGE_HEIGHT],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* 🔹 Sticky Animated Header */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="#0F1831" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.stickyTitle}>{hotel.title}</Text>
          <Text style={styles.stickySubtitle}>{hotel.location.location}</Text>
        </View>

        <Icon name="dots-vertical" size={22} color="#0F1831" />
      </Animated.View>

      {/* 🔹 Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Header Image */}
        <View>
          <Image source={{ uri: hotel.image }} style={styles.headerImage} />

          {/* Image Header Buttons */}
          <View style={styles.imageHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerBtn}
            >
              <Icon name="arrow-left" size={22} color="#0F1831" />
            </TouchableOpacity>

            <Text style={styles.imageHeaderTitle}>Detail</Text>

            <TouchableOpacity style={styles.headerBtn}>
              <Icon name="dots-vertical" size={22} color="#0F1831" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.hotelName}>{hotel.title}</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.locationText}>
              {hotel.location.location}
            </Text>
            <View style={styles.row}>
              <Icon name="star" size={16} color="#FFB800" />
              <Text style={styles.rating}>{hotel.rating}</Text>
            </View>
          </View>

          {/* Facilities */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Common Facilities</Text>
            <Text style={styles.link} onPress={() => navigation.navigate('FacilitiesAccordionScreen')}>See All</Text>
          </View>

          <View style={styles.facilitiesRow}>
            {hotel.facilities.map(f => (
              <View key={f.key} style={styles.facilityItem}>
                <View style={styles.facilityIcon}>
                  {f.key === 'pool' ? (
                    <SwimIcon width={26} height={26} />
                  ) : f.key === 'frontdesk' ? (
                    <SupportIcon width={26} height={26} />
                  ) : f.key === 'restaurant' ? (
                    <ResturantIcon width={26} height={26} />
                  ) : f.key === 'ac' ? (
                    <WindIcon width={26} height={26} />
                  ) : (
                    <Icon name={f.icon} size={22} color={PRIMARY} />
                  )}
                </View>
                <Text style={styles.facilityText}>{f.label}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description} numberOfLines={descExpanded ? undefined : 3}>
            {hotel.description}
            {!descExpanded && '... '}
            <Text style={styles.link} onPress={() => setDescExpanded(!descExpanded)}>
              {descExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </Text>

          {/* Location */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.link} onPress={handleOpenMap}>Open Map</Text>
          </View>

          <View style={styles.mapBox}>
            <MapCard
              latitude={hotel.location.latitude}
              longitude={hotel.location.longitude}
            />
          </View>

          <Text style={styles.address}>{hotel.address}</Text>

          {/* Reviews */}
          <View style={styles.reviewCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <Text style={styles.link} onPress={() => navigation.navigate('ReviewScreen')}>See All</Text>
            </View>

            {hotel.reviews.map(r => (
              <View key={r.id} style={styles.reviewRow}>
                <Image source={{ uri: r.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewName}>{r.name}</Text>
                  <Text style={styles.reviewText}>{r.text}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="star" size={14} color="#FFB800" />
                  <Text style={styles.rating}>{r.rating}</Text>
                </View>
              </View>
            ))}
          </View>


          <View style={{ height: 70 }} />
        </View>
      </Animated.ScrollView>

      {/* 🔹 Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Price</Text>
          <Text style={styles.bottomPrice}>
            ${hotel.price}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate('RequestToBookScreen', { hotel: hotel })}
        >
          <Text style={styles.bookText}>Booking Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  /* 🔹 Sticky Header */
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F7',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  stickyTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },

  stickySubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
    marginTop: 2,
  },

  /* 🔹 Header Image */
  headerImage: {
    width: '100%',
    height: HEADER_IMAGE_HEIGHT,
  },

  imageHeader: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  imageHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },

  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 🔹 Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginTop: -32,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
  },

  hotelName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },

  locationText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
    marginLeft: 4,
  },

  /* 🔹 Section */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
  },

  link: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: PRIMARY,
  },

  /* 🔹 Facilities */
  facilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },

  facilityItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },

  facilityIcon: {
    width: 54,
    height: 54,
    borderRadius: 30,
    backgroundColor: '#E8F2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },

  facilityText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#8C95A8',
    textAlign: 'center',
    flexWrap: 'wrap',
  },

  /* 🔹 Description */
  description: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
    marginTop: 6,
  },

  /* 🔹 Map */
  mapBox: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 10,
  },

  address: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
    marginTop: 6,
  },

  /* 🔹 Reviews */
  reviewRow: {
    flexDirection: 'row',
    marginTop: 14,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },

  reviewName: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
  },

  reviewText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
  },

  /* 🔹 Bottom Bar */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  bottomLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
  },

  bottomPrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },

  bookBtn: {
    flex: 1,
    backgroundColor: PRIMARY,
    marginLeft: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  bookText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});


export default BookingDetailScreen;
