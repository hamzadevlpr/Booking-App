import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    useColorScheme,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from "../assets/icons/message-text.svg"
import { mockHotels } from '../utiles';
import SearchBar from '../components/SearchBar';
import FilterBottomSheet from '../components/FilterBottomSheet';

const { width, height } = Dimensions.get('window');
const PRIMARY = '#2853AF';

const MapExploreScreen = ({ navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [selectedHotel, setSelectedHotel] = useState(mockHotels[0]);
    const [searchText, setSearchText] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const mapRef = useRef<MapView>(null);

    const handleMarkerPress = (hotel: typeof mockHotels[0], index: number) => {
        setSelectedHotel(hotel);
        flatListRef.current?.scrollToIndex({ index, animated: true });
        
        mapRef.current?.animateToRegion({
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }, 500);
    };

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (width - 40 + 20));
        if (mockHotels[index]) {
            setSelectedHotel(mockHotels[index]);
            
            mapRef.current?.animateToRegion({
                latitude: mockHotels[index].latitude,
                longitude: mockHotels[index].longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 500);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        header: {
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            zIndex: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: 'transparent',
        },
        backBtn: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
        },
        headerTitle: {
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            color: isDarkMode ? '#fff' : '#0F1831',
            flex: 1,
            textAlign: 'center',
        },
        menuBtn: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
        },
        map: {
            flex: 1,
        },
        markerWrapper: {
            alignItems: 'center',
        },
        markerImage: {
            width: 70,
            height: 70,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: '#fff',
        },
        ratingBadge: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 2,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        ratingText: {
            fontSize: 11,
            fontFamily: 'Poppins-SemiBold',
            color: '#0F1831',
        },
        hotelCard: {
            backgroundColor: '#fff',
            borderRadius: 20,
            marginHorizontal: 10,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 16,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            width: width - 40,
        },
        cardContent: {
            flexDirection: 'row',
            marginBottom: 16,
        },
        hotelImage: {
            width: 80,
            height: 80,
            borderRadius: 12,
        },
        hotelDetails: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'space-between',
        },
        hotelTitle: {
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
            color: '#0F1831',
            marginBottom: 4,
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
        priceRatingRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 4,
        },
        price: {
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            color: PRIMARY,
        },
        ratingWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        priceRatingText: {
            fontSize: 12,
            fontFamily: 'Poppins-SemiBold',
            color: '#0F1831',
        },
        bookingBtn: {
            backgroundColor: PRIMARY,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 12,
        },
        bookingBtnText: {
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            color: '#fff',
        },
        messageBtn: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#F2F3F7',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
    });

    const renderHotelCard = ({ item }: { item: typeof mockHotels[0] }) => (
        <View style={styles.hotelCard}>
            <View style={styles.cardContent}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.hotelImage}
                />
                <View style={styles.hotelDetails}>
                    <Text style={styles.hotelTitle}>{item.title}</Text>
                    <View style={styles.locationRow}>
                        <Icon name="map-marker" size={14} color="#8C95A8" />
                        <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <View style={styles.priceRatingRow}>
                        <Text style={styles.price}>{item.price}</Text>
                        <View style={styles.ratingWrapper}>
                            <Icon name="star" size={14} color="#FFB800" />
                            <Text style={styles.priceRatingText}>{item.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.bookingBtn, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.bookingBtnText}>Booking Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageBtn}>
                    <ChatIcon width={26} height={26} fill='transparent' />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            {/* Map View */}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 32.7157,
                    longitude: -117.1611,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {mockHotels.map((hotel, index) => (
                    <Marker
                        key={hotel.id}
                        coordinate={{
                            latitude: hotel.latitude,
                            longitude: hotel.longitude,
                        }}
                        onPress={() => handleMarkerPress(hotel, index)}
                    >
                        <View style={styles.markerWrapper}>
                            <Image
                                source={{ uri: hotel.image }}
                                style={styles.markerImage}
                            />
                            <View style={styles.ratingBadge}>
                                <Icon name="star" size={12} color="#FFCD1A" />
                                <Text style={styles.ratingText}>{hotel.rating}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Header Overlay */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation?.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#0F1831" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nearby Hotel</Text>
                <TouchableOpacity style={styles.menuBtn}>
                    <Icon name="menu" size={24} color="#0F1831" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <SearchBar
                searchText={searchText}
                onSearchChange={setSearchText}
                onFilterPress={() => setIsFilterVisible(true)}
            />

            {/* Bottom Hotel Card */}
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <FlatList
                    ref={flatListRef}
                    data={mockHotels}
                    renderItem={renderHotelCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width - 40 + 20}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 25 }}
                    onMomentumScrollEnd={handleScroll}
                    getItemLayout={(data, index) => ({
                        length: width - 40,
                        offset: (width - 40 + 20) * index,
                        index,
                    })}
                />
            </View>

            {/* Filter Bottom Sheet */}
            <FilterBottomSheet
                visible={isFilterVisible}
                onClose={() => setIsFilterVisible(false)}
            />
        </SafeAreaView>
    );
};

export default MapExploreScreen;
