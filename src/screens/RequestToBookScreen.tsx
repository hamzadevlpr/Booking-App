import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalenderIcon from "../assets/icons/calendar.svg"
import WalletIcon from "../assets/icons/empty-wallet.svg"
import SelectDateModal from '../components/SelectDateModal';
import { differenceInDays, formatISO, isValid, parseISO } from 'date-fns';

const RequestToBookScreen = ({ navigation, route }: any) => {
    const { hotel } = route.params;
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [checkInDate, setCheckInDate] = useState<string>('Select Date');
    const [checkOutDate, setCheckOutDate] = useState<string>('Select Date');
    const [guestCount, setGuestCount] = useState<number>(1);

    const handleDecrease = () => {
        if (guestCount > 1) setGuestCount((prev) => prev - 1);
    };

    const handleIncrease = () => {
        if (guestCount < 6) setGuestCount((prev) => prev + 1);
    };

    // Pricing constants
    const BASE_GUESTS = 1;
    const EXTRA_GUEST_FEE_PER_NIGHT = 10; // $10 per extra guest per night
    const CLEANING_FEE = 5;
    const SERVICE_FEE = 5;

    const getNights = () => {
        if (checkInDate === 'Select Date' || checkOutDate === 'Select Date') return 0;

        const start = parseISO(checkInDate);
        const end = parseISO(checkOutDate);

        if (!isValid(start) || !isValid(end)) return 0;

        return Math.max(differenceInDays(end, start), 0);
    };

    const nights = getNights();

    const extraGuests = Math.max(guestCount - BASE_GUESTS, 0);
    const extraGuestCost = extraGuests * EXTRA_GUEST_FEE_PER_NIGHT * nights;

    const baseStayPrice = hotel.price * nights;
    const totalPayment = baseStayPrice + extraGuestCost + CLEANING_FEE + SERVICE_FEE;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={22} color="#0F1831" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Request to Book</Text>
                <View style={{ width: 22 }} />
            </View>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Date Section */}
                <Text style={styles.label}>Date</Text>
                <View style={styles.dateRow}>
                    <TouchableOpacity style={[styles.dateBox, { marginRight: 8 }]} onPress={() => setShowCalendar(true)}>
                        <View style={styles.dateIconRow}>
                            <CalenderIcon width={24} height={24} style={{ marginRight: 4 }} />
                            <Text style={styles.dateTextLabel}>Check - In</Text>
                        </View>
                        <Text style={styles.dateValue}>{checkInDate}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dateBox} onPress={() => setShowCalendar(true)}>
                        <View style={styles.dateIconRow}>
                            <CalenderIcon width={24} height={24} style={{ marginRight: 4 }} />
                            <Text style={styles.dateTextLabel}>Check - Out</Text>
                        </View>
                        <Text style={styles.dateValue}>{checkOutDate}</Text>
                    </TouchableOpacity>
                </View>
                {/* Guest Section */}
                <View style={styles.guestRow}>
                    <Text style={styles.label}>Guest</Text>
                    <View style={styles.guestRow}>
                        <TouchableOpacity style={[styles.guestBtn, styles.minusCount]} onPress={handleDecrease}>
                            <Text style={[styles.guestBtnText, { color: '#171621' }]}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.guestCount}>{guestCount}</Text>
                        <TouchableOpacity style={[styles.guestBtn, styles.plusCount]} onPress={handleIncrease}>
                            <Text style={[styles.guestBtnText, { color: '#ffffff' }]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Pay With Section */}
                <View style={styles.payContainer}>
                    <Text style={styles.label}>Pay With</Text>
                    <View style={styles.payWithBox}>
                        <View style={styles.payWithRow}>
                            <View style={styles.payWithIconBox}>
                                <WalletIcon width={24} height={24} />
                            </View>
                            <View style={styles.payWithInfo}>
                                <Text style={styles.payWithName}>FastPayz</Text>
                                <Text style={styles.payWithCard}>******6587</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.editBtnText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Payment Details */}
                <Text style={styles.label}>Payment Details</Text>
                <View style={styles.payContainer}>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>
                            {nights} {nights === 1 ? 'Night' : 'Nights'} × ${hotel.price}
                        </Text>
                        <Text style={styles.paymentValue}>${baseStayPrice.toFixed(2)}</Text>
                    </View>
                    {extraGuests > 0 && (
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>
                                Extra Guests ({extraGuests}) × ${EXTRA_GUEST_FEE_PER_NIGHT} × {nights}
                            </Text>
                            <Text style={styles.paymentValue}>${extraGuestCost.toFixed(2)}</Text>
                        </View>
                    )}
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Cleaning Fee</Text>
                        <Text style={styles.paymentValue}>${CLEANING_FEE.toFixed(2)}</Text>
                    </View>

                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Service Fee</Text>
                        <Text style={styles.paymentValue}>${SERVICE_FEE.toFixed(2)}</Text>
                    </View>

                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentTotalLabel}>Total Payment:</Text>
                        <Text style={styles.paymentTotalValue}>${totalPayment.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
            {/* Checkout Button */}
            <View style={styles.checkoutBtnBox}>
                <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('CheckoutScreen', {
                        hotel: hotel,
                        booking: {
                            checkInDate,
                            checkOutDate,
                            baseStayPrice,
                            extraGuestCost,
                            totalPayment,
                        },
                    })}
                >
                    <Text style={styles.checkoutBtnText}>Checkout</Text>
                </TouchableOpacity>
            </View>
            <SelectDateModal
                visible={showCalendar}
                onClose={() => setShowCalendar(false)}
                onApply={({ checkIn, checkOut }) => {
                    setCheckInDate(formatISO(checkIn, { representation: 'date' }));
                    setCheckOutDate(formatISO(checkOut, { representation: 'date' }));
                }}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingTop: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#0F1831',
    },
    time: {
        fontSize: 16,
        color: '#222',
        alignSelf: 'flex-start',
        marginBottom: 8,
        fontWeight: '500',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 2,
    },
    arrow: {
        fontSize: 20,
        color: '#222',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        fontFamily: 'Poppins-Bold',
    },
    menuBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 2,
    },
    label: {
        fontSize: 16,
        color: '#171725',
        fontFamily: 'Poppins-SemiBold',
    },
    menuDots: {
        fontSize: 18,
        color: '#222',
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 12,
    },
    dateBox: {
        flex: 1,
        backgroundColor: 'rgba(247, 247, 247, 0.9)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 0,
        borderColor: 'none',
    },
    dateIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        backgroundColor: 'rgba(247, 247, 247, 0.9)',
    },
    dateIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    dateTextLabel: {
        fontSize: 16,
        color: '#171725',
        fontFamily: 'Poppins-Medium',
    },
    dateValue: {
        fontSize: 16,
        color: '#737373',
        fontFamily: 'Poppins-Regular',
    },
    guestRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 8,
    },
    guestBtn: {
        width: 34,
        height: 34,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderColor: 'none',
    },
    guestBtnText: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
    },
    guestCount: {
        fontSize: 16,
        color: '#171621',
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 16,
    },
    minusCount: {
        backgroundColor: '#ECF1F6',
        color: '#171621',
    },
    plusCount: {
        backgroundColor: '#2853AF',
    },
    payContainer: {
        marginBottom: 8,
        marginTop: 8
    },
    payWithBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        marginTop: 8,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#0000000D',
    },
    payWithRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    payWithIconBox: {
        width: 45,
        height: 45,
        borderRadius: 20,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    payWithInfo: {
        justifyContent: 'center',
    },
    payWithName: {
        fontSize: 15,
        color: '#171621',
        fontFamily: 'Poppins-SemiBold',
    },
    payWithCard: {
        fontSize: 16,
        color: '#888',
        marginTop: 2,
        fontFamily: 'Poppins-Medium',
    },
    editBtn: {
        borderWidth: 1,
        borderColor: '#1A3C8B',
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 6,
        alignSelf: 'center',
    },
    editBtnText: {
        color: '#1A3C8B',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        paddingHorizontal: 2,
    },
    paymentValue: {
        fontSize: 16,
        color: '#171621',
        fontFamily: 'Poppins-Regular',
    },
    paymentTotalLabel: {
        fontSize: 16,
        color: '#171621',
        fontFamily: 'Poppins-Bold',
        marginTop: 8,
    },
    paymentTotalValue: {
        fontSize: 16,
        color: '#171621',
        fontFamily: 'Poppins-Regular',
        marginTop: 8,
    },
    paymentLabel: {
        fontSize: 16,
        color: '#737373',
        fontFamily: 'Poppins-Regular',
    },
    checkoutBtnBox: {
        padding: 20,
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 8,
    },
    checkoutBtn: {
        backgroundColor: '#1A3C8B',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
    },
    checkoutBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 0.2,
    },
});

export default RequestToBookScreen;
