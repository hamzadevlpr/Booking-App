import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationIcon from "../assets/icons/location.svg"
import BuildingIcon from "../assets/icons/buliding-2.svg"
import CalendarIcon from "../assets/icons/calendar-2.svg"
import UserIcon from "../assets/icons/user-2.svg"
import PromoIcon from "../assets/icons/discount-shape.svg"
import PhoneIcon from "../assets/icons/call.svg"


const { width } = Dimensions.get('window');

const PRIMARY = '#2853AF';
const TEXT_DARK = '#171725';
const TEXT_MUTED = '#9CA4AB';
const BG = '#ffffff';
const CARD = '#FFFFFF';

const CheckoutScreen: React.FC = ({ navigation, route }: any) => {
    const { hotel, booking } = route.params;
    const formatBookingDates = (checkIn: string, checkOut: string) => {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const formattedCheckIn = checkInDate.toLocaleDateString('en-US', options);
        const formattedCheckOut = checkOutDate.toLocaleDateString('en-US', options);
        return `${formattedCheckIn} - ${formattedCheckOut}`;
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerBtn}>
                        <Icon name="arrow-left" size={22} color={TEXT_DARK} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <TouchableOpacity style={styles.headerBtn}>
                        <Icon name="dots-vertical" size={22} color={TEXT_DARK} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.hotelCard}>
                        <Image
                            style={styles.hotelImage}
                            source={{ uri: hotel.image }}
                        />
                        <View style={styles.hotelInfo}>
                            <View style={styles.hotelRow}>
                                <Text style={styles.hotelName}>{hotel.title}</Text>
                                <Icon name="star" size={14} color="#FBBF24" />
                                <Text style={styles.rating}>{hotel.rating}</Text>
                            </View>
                            <View style={styles.locationRow}>
                                <LocationIcon width={16} height={16} />
                                <Text style={styles.location}>{hotel.location.location}</Text>
                            </View>
                            <Text style={styles.price}>
                                <Text style={styles.priceValue}>${hotel.price}</Text>
                                <Text style={styles.night}> /night</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.bookingCard}>
                        <Text style={styles.sectionTitle}>Your Booking</Text>

                        <View style={styles.row}>
                            <CalendarIcon width={18} height={18} />
                            <Text style={styles.label}>Dates</Text>
                            <Text style={styles.value}>
                                {formatBookingDates(booking.checkInDate, booking.checkOutDate)}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <UserIcon width={18} height={18} />
                            <Text style={styles.label}>Guest</Text>
                            <Text style={styles.value}>{booking.guests} Guests ({booking.rooms} Room)</Text>
                        </View>

                        <View style={styles.row}>
                            <BuildingIcon width={18} height={18} />
                            <Text style={styles.label}>Room type</Text>
                            <Text style={styles.value}>Queen Room</Text>
                        </View>

                        <View style={styles.row}>
                            <PhoneIcon width={18} height={18} />
                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.value}>0214345646</Text>
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>Price Details</Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Price</Text>
                            <Text style={styles.priceAmount}>$ {booking.baseStayPrice}</Text>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Admin fee</Text>
                            <Text style={styles.priceAmount}>$ 2.50</Text>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.totalLabel}>Total price</Text>
                            <Text style={styles.totalValue}>$ {booking.totalPayment}</Text>
                        </View>
                    </View>

                    <Text style={styles.promoTitle}>Promo</Text>
                    <TouchableOpacity style={styles.promoBox}>
                        <PromoIcon width={22} height={22} />
                        <Text style={styles.promoText}>Select</Text>
                        <Icon name="chevron-right" size={22} color={PRIMARY} />
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.payBtn}>
                        <Text style={styles.payText}>Select Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BG,
    },
    container: {
        flex: 1,
        backgroundColor: BG,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: CARD,
    },
    headerBtn: {
        width: 40,
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: TEXT_DARK,
        fontFamily: "Poppins-Bold",
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    hotelCard: {
        flexDirection: 'row',
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
    },
    hotelImage: {
        width: 78,
        height: 78,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#E5E7EB',
    },
    hotelInfo: {
        flex: 1,
    },
    hotelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hotelName: {
        fontSize: 20,
        color: TEXT_DARK,
        marginRight: 6,
        maxWidth: width * 0.45,
        fontFamily: "Poppins-Medium",
    },
    rating: {
        marginLeft: 4,
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        color: TEXT_DARK,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    location: {
        marginLeft: 4,
        fontSize: 12,
        color: TEXT_MUTED,
        maxWidth: width * 0.5,
        fontFamily: "Poppins-Regular",
    },
    price: {
        marginTop: 4,
    },
    priceValue: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: PRIMARY,
    },
    night: {
        fontSize: 13,
        fontFamily: "Poppins-Medium",
        color: TEXT_MUTED,
    },
    bookingCard: {
        backgroundColor: CARD,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E9EBED',
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: "Poppins-SemiBold",
        color: PRIMARY,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        marginLeft: 8,
        color: TEXT_MUTED,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: TEXT_DARK,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#BFC6CC',
        borderStyle: 'dashed',
        marginVertical: 12,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    priceLabel: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        color: TEXT_MUTED,
    },
    priceAmount: {
        fontSize: 14,
        color: TEXT_DARK,
        fontFamily: "Poppins-Medium",
    },
    totalLabel: {
        fontSize: 15,
        fontFamily: "Poppins-SemiBold",
        color: TEXT_DARK,
    },
    totalValue: {
        fontSize: 15,
        fontFamily: "Poppins-SemiBold",
        color: TEXT_DARK,
    },
    promoTitle: {
        fontSize: 15,
        fontFamily: "Poppins-Bold",
        color: TEXT_DARK,
        marginBottom: 8,
    },
    promoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECF1F6',
        paddingVertical: 16,
        borderRadius: 12,
        padding: 14,
        marginBottom: 24,
    },
    promoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        fontFamily: "Poppins-SemiBold",
        color: PRIMARY,
    },
    footer: {
        padding: 16,
        backgroundColor: BG,
    },
    payBtn: {
        backgroundColor: PRIMARY,
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
    },
    payText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Poppins-Bold",
    },
});
