import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockBookingDetail } from '../utiles';
import MapCard from '../components/MapCard';

const PRIMARY = '#2853AF';

const BookingDetailScreen = ({ navigation }: any) => {
    const data = mockBookingDetail;

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F8FA' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={{ position: 'relative' }}>
                    <Image source={{ uri: data.image }} style={styles.headerImage} />
                    <View style={styles.headerBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                            <Icon name="arrow-left" size={22} color="#0F1831" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Detail</Text>
                        <TouchableOpacity style={styles.headerBtn}>
                            <Icon name="dots-vertical" size={22} color="#0F1831" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Card Section */}
                <View style={styles.cardSection}>
                    <Text style={styles.hotelName}>{data.name}</Text>
                    <View style={styles.rowBetween}>
                        <Text style={styles.hotelLocation}>{data.location.location}</Text>
                        <View style={styles.row}>
                            <Icon name="star" size={16} color="#FFB800" />
                            <Text style={styles.rating}>{data.rating}</Text>
                        </View>
                    </View>

                    {/* Common Facilities */}
                    <View style={styles.facilitiesHeaderRow}>
                        <Text style={styles.facilitiesLabel}>Common Facilities</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.facilitiesRow}>
                        {data.facilities.map(fac => (
                            <View key={fac.key} style={styles.facilityItem}>
                                <View style={styles.facilityIconWrap}>
                                    <Icon name={fac.icon} size={22} color={PRIMARY} />
                                </View>
                                <Text style={styles.facilityText}>{fac.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{data.description} <Text style={styles.readMore}>Read More</Text></Text>

                    {/* Location */}
                    <View style={styles.locationHeaderRow}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <TouchableOpacity>
                            <Text style={styles.openMap}>Open Map</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapBox}>
                        <MapCard longitude={data.location.longitude} latitude={data.location.latitude} />
                    </View>
                    <Text style={styles.address}>{data.address}</Text>
                </View>

                {/* Reviews */}
                <View style={styles.cardSection}>
                    <View style={styles.reviewsHeaderRow}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {data.reviews.map(r => (
                        <View key={r.id} style={styles.reviewRow}>
                            <Image source={{ uri: r.avatar }} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.reviewName}>{r.name}</Text>
                                <Text style={styles.reviewText}>{r.text}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name="star" size={16} color="#FFB800" />
                                <Text style={styles.rating}>{r.rating}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Recommendation */}
                <View style={styles.cardSection}>
                    <Text style={styles.sectionTitle}>Recommendation</Text>
                    <View style={styles.recommendRow}>
                        <Image source={{ uri: data.recommendations[0].image }} style={styles.recommendImage} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.recommendName}>{data.recommendations[0].name}</Text>
                            <Text style={styles.recommendLocation}>{data.recommendations[0].location}</Text>
                            <View style={styles.row}>
                                <Icon name="star" size={16} color="#FFB800" />
                                <Text style={styles.rating}>{data.recommendations[0].rating}</Text>
                                <Text style={styles.recommendPrice}>${data.recommendations[0].price}</Text>
                                <Text style={styles.recommendOldPrice}>${data.recommendations[0].oldPrice}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.bottomPrice}>Price</Text>
                <Text style={styles.bottomPriceValue}>${data.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.bookingBtn}>
                    <Text style={styles.bookingBtnText}>Booking Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerImage: { width: '100%', height: 220, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerBar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 36, zIndex: 10 },
    headerBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 16, fontFamily: 'Poppins-Bold', color: '#0F1831', textAlign: 'center', flex: 1 },
    cardSection: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 12, marginTop: 16, padding: 18, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
    hotelName: { fontSize: 18, fontFamily: 'Poppins-Bold', color: '#0F1831', marginBottom: 4 },
    hotelLocation: { fontSize: 13, color: '#8C95A8', fontFamily: 'Poppins-Regular' },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    row: { flexDirection: 'row', alignItems: 'center' },
    rating: { fontSize: 13, color: '#0F1831', fontFamily: 'Poppins-SemiBold', marginLeft: 4 },
    facilitiesHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
    facilitiesLabel: { fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#0F1831' },
    seeAll: { color: PRIMARY, fontSize: 13, fontFamily: 'Poppins-Medium' },
    facilitiesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 8 },
    facilityItem: { alignItems: 'center', marginRight: 24 },
    facilityIconWrap: { backgroundColor: '#F2F6FF', borderRadius: 16, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    facilityText: { fontSize: 12, color: '#8C95A8', fontFamily: 'Poppins-Medium' },
    sectionTitle: { fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#0F1831', marginTop: 10, marginBottom: 6 },
    description: { fontSize: 13, color: '#8C95A8', fontFamily: 'Poppins-Regular', marginBottom: 4 },
    readMore: { color: PRIMARY, fontSize: 13, fontFamily: 'Poppins-Medium' },
    locationHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
    openMap: { color: PRIMARY, fontSize: 13, fontFamily: 'Poppins-Medium' },
    mapBox: { borderRadius: 16, overflow: 'hidden', marginTop: 10, marginBottom: 8 },
    mapImage: { width: '100%', height: 90, borderRadius: 16 },
    address: { fontSize: 13, color: '#8C95A8', fontFamily: 'Poppins-Regular', marginBottom: 8 },
    reviewsHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    reviewRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
    avatar: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
    reviewName: { fontSize: 13, fontFamily: 'Poppins-SemiBold', color: '#0F1831' },
    reviewText: { fontSize: 13, color: '#8C95A8', fontFamily: 'Poppins-Regular' },
    recommendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    recommendImage: { width: 60, height: 60, borderRadius: 12 },
    recommendName: { fontSize: 14, fontFamily: 'Poppins-Bold', color: '#0F1831' },
    recommendLocation: { fontSize: 12, color: '#8C95A8', fontFamily: 'Poppins-Regular', marginBottom: 2 },
    recommendPrice: { fontSize: 13, color: PRIMARY, fontFamily: 'Poppins-Bold', marginLeft: 8 },
    recommendOldPrice: { fontSize: 13, color: '#B0B4BB', fontFamily: 'Poppins-Regular', marginLeft: 6, textDecorationLine: 'line-through' },
    bottomBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 18, borderTopRightRadius: 18, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: -2 }, elevation: 8 },
    bottomPrice: { fontSize: 13, color: '#8C95A8', fontFamily: 'Poppins-Regular', marginRight: 8 },
    bottomPriceValue: { fontSize: 18, color: '#0F1831', fontFamily: 'Poppins-Bold', marginRight: 16 },
    bookingBtn: { flex: 1, backgroundColor: PRIMARY, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    bookingBtnText: { color: '#fff', fontSize: 16, fontFamily: 'Poppins-Bold' },
});

export default BookingDetailScreen;
