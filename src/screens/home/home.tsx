import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { recommended } from '../../utiles';
import MapCard from '../../components/MapCard';

const PRIMARY = '#2853AF';

const popularSpots = [
  {
    id: '1',
    title: 'The Horizon Retreat',
    location: 'Los Angeles, CA',
    price: '$480/night',
    rating: '4.5',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Opal Grove Inn',
    location: 'San Diego, CA',
    price: '$190/night',
    rating: '4.5',
    image:
      'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Palm Breeze Villa',
    location: 'Miami, FL',
    price: '$320/night',
    rating: '4.6',
    image:
      'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const categories = [
  { id: 'all', label: 'All', icon: 'apps', active: true },

  // Core stays
  { id: 'hotels', label: 'Hotels', icon: 'office-building-outline' },
  { id: 'villas', label: 'Villas', icon: 'home-city-outline' },
  { id: 'apt', label: 'Apartments', icon: 'home-outline' },

  // Popular hotel services
  { id: 'resorts', label: 'Resorts', icon: 'beach' },
  { id: 'luxury', label: 'Luxury', icon: 'diamond-stone' },
  { id: 'budget', label: 'Budget', icon: 'cash-multiple' },
  { id: 'family', label: 'Family', icon: 'account-group-outline' },
  { id: 'business', label: 'Business', icon: 'briefcase-outline' },

  // Experience-based
  { id: 'spa', label: 'Spa', icon: 'spa-outline' },
  { id: 'pool', label: 'Pool', icon: 'pool' },
  { id: 'beachfront', label: 'Beachfront', icon: 'umbrella-beach' },

  // Amenities
  { id: 'wifi', label: 'Free Wi-Fi', icon: 'wifi' },
  { id: 'parking', label: 'Parking', icon: 'parking' },
  { id: 'breakfast', label: 'Breakfast', icon: 'food-outline' },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80',
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>Matr Kohler</Text>
              <View style={styles.locationRow}>
                <Icon name="map-marker" size={16} color="#8C95A8" />
                <Text style={styles.locationText}>San Diego, CA</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Icon name="magnify" size={20} color="#0F1831" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Icon name="bell-outline" size={20} color="#0F1831" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconWrap}>
            <Icon name="map-marker" size={22} color={PRIMARY} />
          </View>
          <Text style={styles.bannerText}>You Can Change Your Location to show nearby villas</Text>
          <Icon name="chevron-right" size={22} color="#0F1831" />
        </View>

        {/* Most Popular */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Most Popular</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={popularSpots}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.cardImage}
                imageStyle={styles.cardImageRadius}
              >
                <TouchableOpacity style={styles.heartBtn}>
                  <Icon name="heart" size={16} color="#F45B84" />
                </TouchableOpacity>
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.75)"]}
                  style={styles.cardOverlay}
                >
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardSub}>{item.location}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                    <View style={styles.cardRating}>
                      <Icon name="star" size={12} color="#FFB800" />
                      <Text style={styles.cardRatingText}>{item.rating}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          )}
        />

        {/* Recommended */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterChip, item.active && styles.filterChipActive]}
              activeOpacity={0.8}
            >
              <Icon
                name={item.icon}
                size={16}
                color={item.active ? '#fff' : '#8C95A8'}
              />
              <Text style={[styles.filterText, item.active && styles.filterTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
          data={recommended}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={[styles.recoCard]}>
              <Image source={{ uri: item.image }} style={styles.recoImage} />
              <View style={styles.recommendedContent}>
                <Text style={styles.recoTitle}>{item.title}</Text>
                <View style={styles.recoLocationRow}>
                  <EvilIcons name="location" size={18} color="#8C95A8" />
                  <Text style={styles.recoLocation}>{item.location}</Text>
                </View>
                <View style={styles.recoFooter}>
                  <Text style={styles.recoPrice}>{item.price}</Text>
                  <View style={styles.recoRating}>
                    <Icon name="star" size={14} color="#FFB800" />
                    <Text style={styles.recoRatingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />

        {/* Map Card */}
        <MapCard
          latitude={21.282778}
          longitude={-157.829444}
          title="Serenity Sands"
          location="Honolulu, HI"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F7',
  },
  content: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 90,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E5EE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  bannerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D7E5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },
  sectionLink: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: PRIMARY,
  },
  card: {
    width: 170,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 230,
  },
  cardImageRadius: {
    borderRadius: 14,
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  cardSub: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#E8ECF4',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardRatingText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E3E6EE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  filterChipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#8C95A8',
  },
  filterTextActive: {
    color: '#fff',
  },
  recoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
    marginBottom: 6,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 2,
  },
  recoImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  recommendedContent: {
    flex: 1,
    marginLeft: 12,
  },
  recoTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },
  recoLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  recoLocation: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
  },
  recoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  recoPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: PRIMARY,
  },
  recoRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recoRatingText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
  },
  moreBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F6FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    color: '#9CA3AF',
    marginTop: 4,
  },
  tabLabelActive: {
    color: PRIMARY,
  },
});

export default HomeScreen;
