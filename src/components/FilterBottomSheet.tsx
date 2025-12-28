import React, { forwardRef, useMemo, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Modal,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PRIMARY = '#2853AF';
const { height } = Dimensions.get('window');

type Props = {
    onClose: () => void;
};

const FilterBottomSheet = forwardRef<BottomSheet, Props>(({ onClose }, ref) => {
    const snapPoints = useMemo(() => ['45%', '85%'], []);

    /* ---------------- STATE ---------------- */
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);
    const [guestModal, setGuestModal] = useState(false);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(80);

    const [instantBook, setInstantBook] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('San Diego');
    const [rating, setRating] = useState(5);

    const [facilities, setFacilities] = useState({
        wifi: true,
        pool: false,
        tv: false,
        laundry: true,
    });

    /* ---------------- HELPERS ---------------- */
    const toggleFacility = (key: keyof typeof facilities) => {
        setFacilities(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const totalGuests = adults + children;

    /* ---------------- UI ---------------- */
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={onClose}
            backgroundStyle={styles.sheetBg}
            handleIndicatorStyle={styles.handle}
        >
            <BottomSheetScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Filter By</Text>

                {/* Guests */}
                <View style={styles.section}>
                    <Text style={styles.label}>Guests</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setGuestModal(true)}
                    >
                        <Text style={styles.dropdownText}>
                            {totalGuests} Guest ({adults} Adult, {children} Children)
                        </Text>
                        <Icon name="chevron-down" size={20} />
                    </TouchableOpacity>
                </View>

                {/* Price */}
                <View style={styles.section}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Price</Text>
                        <Text style={styles.priceText}>${minPrice} - ${maxPrice}</Text>
                    </View>

                    <Slider
                        minimumValue={0}
                        maximumValue={80}
                        value={minPrice}
                        onValueChange={v => v <= maxPrice && setMinPrice(Math.round(v))}
                        minimumTrackTintColor={PRIMARY}
                        maximumTrackTintColor="#E5E7EB"
                        thumbTintColor={PRIMARY}
                    />

                    <Slider
                        minimumValue={0}
                        maximumValue={80}
                        value={maxPrice}
                        onValueChange={v => v >= minPrice && setMaxPrice(Math.round(v))}
                        minimumTrackTintColor={PRIMARY}
                        maximumTrackTintColor="#E5E7EB"
                        thumbTintColor={PRIMARY}
                    />
                </View>

                {/* Instant Book */}
                <View style={styles.section}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.label}>Instant Book</Text>
                            <Text style={styles.subText}>
                                Book without waiting for host
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.toggle, instantBook && styles.toggleOn]}
                            onPress={() => setInstantBook(!instantBook)}
                        >
                            <View
                                style={[
                                    styles.toggleThumb,
                                    instantBook && styles.thumbOn,
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Location */}
                <View style={styles.section}>
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.wrap}>
                        {['San Diego', 'New York', 'Amsterdam'].map(loc => (
                            <TouchableOpacity
                                key={loc}
                                style={[
                                    styles.chip,
                                    selectedLocation === loc && styles.chipActive,
                                ]}
                                onPress={() => setSelectedLocation(loc)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        selectedLocation === loc && styles.chipTextActive,
                                    ]}
                                >
                                    {loc}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Facilities */}
                <View style={styles.section}>
                    <Text style={styles.label}>Facilities</Text>
                    {[
                        ['wifi', 'Free Wifi'],
                        ['pool', 'Swimming Pool'],
                        ['tv', 'TV'],
                        ['laundry', 'Laundry'],
                    ].map(([key, label], idx, arr) => {
                        const checked = facilities[key as keyof typeof facilities];
                        return (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    styles.facilityRow,
                                    idx === arr.length - 1 ? { borderBottomWidth: 0 } : null,
                                ]}
                                onPress={() => toggleFacility(key as any)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.facilityLabel,
                                    checked ? styles.facilityLabelChecked : styles.facilityLabelUnchecked,
                                ]}>{label}</Text>
                                <View style={[
                                    styles.checkbox,
                                    checked && styles.checkboxOn,
                                ]}>
                                    {checked && (
                                        <Icon name="check" size={16} color="#fff" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Ratings */}
                <View style={styles.section}>
                    <Text style={styles.label}>Ratings</Text>
                    <View style={styles.row}>
                        {[5, 4, 3, 2, 1].map(r => (
                            <TouchableOpacity
                                key={r}
                                style={[
                                    styles.ratingBtn,
                                    rating === r && styles.ratingActive,
                                ]}
                                onPress={() => setRating(r)}
                            >
                                <Icon name="star" size={14} color="#FFB800" />
                                <Text>{r}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Apply */}
                <TouchableOpacity
                    style={styles.applyBtn}
                    onPress={() => (ref as any)?.current?.close()}
                >
                    <Text style={styles.applyText}>Apply Filter</Text>
                </TouchableOpacity>
            </BottomSheetScrollView>

            {/* Guest Modal */}
            <Modal visible={guestModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        {[
                            ['Adults', adults, setAdults, 1],
                            ['Children', children, setChildren, 0],
                        ].map(([label, value, setter, min]: any) => (
                            <View key={label} style={styles.modalRow}>
                                <Text>{label}</Text>
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        onPress={() => setter(Math.max(min, value - 1))}
                                    >
                                        <Icon name="minus-circle-outline" size={26} />
                                    </TouchableOpacity>
                                    <Text style={{ marginHorizontal: 16 }}>{value}</Text>
                                    <TouchableOpacity onPress={() => setter(value + 1)}>
                                        <Icon name="plus-circle-outline" size={26} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        <TouchableOpacity
                            style={styles.doneBtn}
                            onPress={() => setGuestModal(false)}
                        >
                            <Text style={{ color: '#fff' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </BottomSheet>
    );
});

export default FilterBottomSheet;

const styles = StyleSheet.create({
    sheetBg: { backgroundColor: '#fff' },
    handle: { backgroundColor: '#E5E7EB', width: 40 },
    container: { paddingBottom: 30, paddingHorizontal: 20 },
    title: { fontSize: 18, fontFamily: 'Poppins-Bold', color: '#0F1831', marginBottom: 24, alignSelf: 'center' },
    section: { marginBottom: 24 },
    label: { fontSize: 14, fontFamily: 'Poppins-SemiBold', color: '#0F1831', marginBottom: 12 },
    dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9F9F9' },
    dropdownText: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#0F1831', flex: 1 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
    modalBox: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 280 },
    modalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    doneBtn: { backgroundColor: PRIMARY, borderRadius: 8, paddingVertical: 10, marginTop: 8, alignItems: 'center' },
    row: { flexDirection: 'row', alignItems: 'center' },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    priceText: { fontSize: 12, fontFamily: 'Poppins-Medium', color: '#C0C0C0' },
    subText: { fontSize: 12, fontFamily: 'Poppins-Regular', color: '#9CA4AB', marginTop: 4 },
    chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9F9F9', marginRight: 8, marginBottom: 8 },
    chipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
    chipText: { fontSize: 13, fontFamily: 'Poppins-Medium', color: '#0F1831' },
    chipTextActive: { color: '#fff' },
    facilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        minHeight: 36,
    },
    facilityLabel: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
    },
    facilityLabelChecked: {
        color: '#9CA4AB',
        fontWeight: '600',
    },
    facilityLabelUnchecked: {
        color: '#B0B4BB',
        fontWeight: '400',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxOn: {
        backgroundColor: PRIMARY,
        borderColor: PRIMARY,
    },
    ratingBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9F9F9', marginRight: 8 },
    ratingActive: { backgroundColor: '#fff', borderColor: PRIMARY },
    applyBtn: { backgroundColor: PRIMARY, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
    applyText: { fontSize: 16, fontFamily: 'Poppins-Bold', color: '#fff' },
    toggle: { width: 50, height: 30, borderRadius: 15, backgroundColor: '#E5E7EB', justifyContent: 'center', padding: 4 },
    toggleOn: { backgroundColor: PRIMARY },
    toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
    thumbOn: { alignSelf: 'flex-end' },
});