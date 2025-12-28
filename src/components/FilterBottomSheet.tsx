import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height } = Dimensions.get('window');
const PRIMARY = '#2853AF';

interface FilterBottomSheetProps {
    visible: boolean;
    onClose: () => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ visible, onClose }) => {
    const [guests, setGuests] = useState('3 Guest (2 Adult, 1 Children)');
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(380);
    const [instantBook, setInstantBook] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('San Diego');
    const [selectedFacilities, setSelectedFacilities] = useState({
        freeWifi: true,
        swimmingPool: false,
        tv: false,
        laundry: true,
    });
    const [selectedRating, setSelectedRating] = useState(5);

    const locations = ['San Diego', 'New York', 'Amsterdam'];
    const facilities = [
        { key: 'freeWifi', label: 'Free Wifi' },
        { key: 'swimmingPool', label: 'Swimming Pool' },
        { key: 'tv', label: 'Tv' },
        { key: 'laundry', label: 'Laundry' },
    ];
    const ratings = [5, 4, 3, 2, 1];

    const toggleFacility = (key: string) => {
        setSelectedFacilities((prev) => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev],
        }));
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <ScrollView
                    style={styles.bottomSheet}
                    scrollEnabled={true}
                    bounces={false}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Filter By</Text>
                    </View>

                    {/* Guests Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Placeholder</Text>
                        <TouchableOpacity style={styles.guestDropdown}>
                            <Text style={styles.guestText}>{guests}</Text>
                            <Icon name="chevron-down" size={20} color="#0F1831" />
                        </TouchableOpacity>
                    </View>

                    {/* Price Section */}
                    <View style={styles.section}>
                        <View style={styles.priceHeader}>
                            <Text style={styles.label}>Price</Text>
                            <Text style={styles.priceRange}>
                                ${priceMin}-${priceMax}
                            </Text>
                        </View>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={380}
                                value={priceMin}
                                onValueChange={setPriceMin}
                                minimumTrackTintColor={PRIMARY}
                                maximumTrackTintColor="#E5E7EB"
                                thumbTintColor={PRIMARY}
                            />
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={380}
                                value={priceMax}
                                onValueChange={setPriceMax}
                                minimumTrackTintColor={PRIMARY}
                                maximumTrackTintColor="#E5E7EB"
                                thumbTintColor={PRIMARY}
                            />
                        </View>
                    </View>

                    {/* Instant Book Section */}
                    <View style={styles.section}>
                        <View style={styles.instantBookRow}>
                            <View style={styles.instantBookText}>
                                <Text style={styles.label}>Instant Book</Text>
                                <Text style={styles.description}>
                                    Book without waiting for the host to respond
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.toggle,
                                    instantBook && styles.toggleActive,
                                ]}
                                onPress={() => setInstantBook(!instantBook)}
                            >
                                <View
                                    style={[
                                        styles.toggleThumb,
                                        instantBook && styles.toggleThumbActive,
                                    ]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Location Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Location</Text>
                        <View style={styles.locationContainer}>
                            {locations.map((location) => (
                                <TouchableOpacity
                                    key={location}
                                    style={[
                                        styles.locationBtn,
                                        selectedLocation === location && styles.locationBtnActive,
                                    ]}
                                    onPress={() => setSelectedLocation(location)}
                                >
                                    <Text
                                        style={[
                                            styles.locationText,
                                            selectedLocation === location &&
                                                styles.locationTextActive,
                                        ]}
                                    >
                                        {location}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Facilities Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Facilities</Text>
                        {facilities.map((facility) => (
                            <TouchableOpacity
                                key={facility.key}
                                style={styles.facilityRow}
                                onPress={() => toggleFacility(facility.key)}
                            >
                                <Text style={styles.facilityLabel}>{facility.label}</Text>
                                <View
                                    style={[
                                        styles.checkbox,
                                        selectedFacilities[facility.key as keyof typeof selectedFacilities] &&
                                            styles.checkboxActive,
                                    ]}
                                >
                                    {selectedFacilities[facility.key as keyof typeof selectedFacilities] && (
                                        <Icon name="check" size={16} color="#fff" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Ratings Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Ratings</Text>
                        <View style={styles.ratingsContainer}>
                            {ratings.map((rating) => (
                                <TouchableOpacity
                                    key={rating}
                                    style={[
                                        styles.ratingBtn,
                                        selectedRating === rating && styles.ratingBtnActive,
                                    ]}
                                    onPress={() => setSelectedRating(rating)}
                                >
                                    <Icon name="star" size={16} color="#FFB800" />
                                    <Text style={styles.ratingText}>{rating}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Apply Button */}
                    <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
                        <Text style={styles.applyBtnText}>Apply Filter</Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        maxHeight: height * 0.9,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#0F1831',
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#0F1831',
        marginBottom: 12,
    },
    guestDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9F9F9',
    },
    guestText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#0F1831',
        flex: 1,
    },
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    priceRange: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: '#C0C0C0',
    },
    sliderContainer: {
        height: 60,
        justifyContent: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    instantBookRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    instantBookText: {
        flex: 1,
        marginRight: 12,
    },
    description: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#9CA4AB',
        marginTop: 4,
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleActive: {
        backgroundColor: PRIMARY,
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    locationContainer: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    locationBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9F9F9',
    },
    locationBtnActive: {
        backgroundColor: PRIMARY,
        borderColor: PRIMARY,
    },
    locationText: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        color: '#0F1831',
    },
    locationTextActive: {
        color: '#fff',
    },
    facilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    facilityLabel: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#0F1831',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: PRIMARY,
        borderColor: PRIMARY,
    },
    ratingsContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    ratingBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9F9F9',
        gap: 4,
    },
    ratingBtnActive: {
        backgroundColor: '#fff',
        borderColor: PRIMARY,
    },
    ratingText: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        color: '#0F1831',
    },
    applyBtn: {
        backgroundColor: PRIMARY,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    applyBtnText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#fff',
    },
});

export default FilterBottomSheet;