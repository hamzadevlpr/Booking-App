import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from '../assets/icons/search.svg';
import HotelCard from '../components/HotelCard';
import { mockHotels } from '../utiles';

const categories = [
    { label: 'All', icon: null },
    { label: 'Villas', icon: 'home-city-outline' },
    { label: 'Hotels', icon: 'office-building-outline' },
    { label: 'Apartments', icon: 'domain' },
];

const ViewAllScreen = ({ navigation }: any) => {
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation?.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#0F1831" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nearby Hotels</Text>
                <TouchableOpacity style={styles.menuBtn}>
                    <SearchIcon width={18} height={18} />
                </TouchableOpacity>
            </View>
            {/* Category Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.label}
                        style={[
                            styles.tab,
                            selectedCategory === cat.label && styles.tabActive,
                        ]}
                        onPress={() => setSelectedCategory(cat.label)}
                    >
                        {cat.icon && (
                            <Icon
                                name={cat.icon}
                                size={18}
                                color={selectedCategory === cat.label ? '#1E40AF' : '#8A8A8E'}
                                style={{ marginRight: 6 }}
                            />
                        )}
                        <Text
                            style={[
                                styles.tabText,
                                selectedCategory === cat.label && styles.tabTextActive,
                            ]}
                        >
                            {cat.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Listings */}
            <FlatList
                data={mockHotels}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('BookingDetail', { hotel: item })}>
                        <HotelCard
                            data={item}
                            onPressHeart={() => { }}
                            isFavorite={false}
                        />
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
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
        color: '#0F1831',
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
    tabsRow: {
        flexGrow: 0,
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginRight: 8,
    },
    tabActive: {
        backgroundColor: '#1E40AF',
    },
    tabText: {
        fontSize: 15,
        color: '#8A8A8E',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#fff',
    }
});

export default ViewAllScreen;
