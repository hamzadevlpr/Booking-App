
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonReview from '../components/SkeletonReview';
import { COLORS } from '../theme/theme';
import ACIcon from "../assets/icons/wind.svg";
import ResturantIcon from "../assets/icons/building.svg";
import SwimIcon from "../assets/icons/swim.svg";
import HelpIcon from "../assets/icons/24-support.svg";

const PRIMARY = '#2853AF';
const STAR_COLOR = '#FFB800';
const { width } = Dimensions.get('window');

const ReviewScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10')
            .then(res => res.json())
            .then(data => {
                // Map randomuser data to review format
                console.log(data);
                const mapped = data.results.map((user: any, idx: number) => ({
                    id: user.login.uuid,
                    name: `${user.name.first} ${user.name.last}`,
                    avatar: user.picture.medium,
                    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                    text: [
                        'Amazing! The room is good than the picture. Thanks for amazing experience!',
                        'The service is on point, and I really like the facilities. Good job!',
                        'Everything was perfect. Highly recommended!',
                        'Clean, comfortable, and great location.',
                        'Staff were friendly and helpful.',
                        'Would definitely come back again!',
                    ][Math.floor(Math.random() * 6)],
                }));
                setReviews(mapped);
            })
            .finally(() => setLoading(false));
    }, []);

    const ratingSummary = {
        average: 4.4,
        total: 532,
        breakdown: [
            { star: 5, count: reviews.length + 100 },
            { star: 4, count: reviews.length + 50 },
            { star: 3, count: reviews.length + 30 },
            { star: 2, count: reviews.length + 20 },
            { star: 1, count: reviews.length + 12 },
        ],
    };


    // Keep the rating summary static for now
    const maxBar = Math.max(...ratingSummary.breakdown.map(b => b.count));

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={22} color="#0F1831" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reviews</Text>
                <Icon name="dots-vertical" size={22} color="#0F1831" />
            </View>

            {/* Rating Summary */}
            <View style={styles.summaryBox}>
                <View style={{ alignItems: 'center', width: 90 }}>
                    <Text style={styles.avgRating}>{ratingSummary.average.toFixed(1)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Icon
                                key={i}
                                name={i < Math.floor(ratingSummary.average) ? 'star' : 'star-outline'}
                                size={18}
                                color={STAR_COLOR}
                                style={{ marginRight: 2 }}
                            />
                        ))}
                    </View>
                    <Text style={styles.reviewCount}>Based on {reviews.length} reviews</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                    {ratingSummary.breakdown.map((b, idx) => (
                        <View key={b.star} style={styles.barRow}>
                            <Text style={styles.barLabel}>{b.star}</Text>
                            <View style={styles.barBg}>
                                <View
                                    style={[
                                        styles.barFill,
                                        { width: `${(b.count / maxBar) * 100}%` },
                                    ]}
                                />
                            </View>
                            <Text style={styles.barCount}>{b.count}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Review List */}
            <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
            {loading ? (
                <>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <SkeletonReview key={i} />
                    ))}
                </>
            ) : (
                <FlatList
                    data={reviews}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.reviewRow}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.reviewName}>{item.name}</Text>
                                <Text style={styles.reviewText}>{item.text}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="star" size={16} color={STAR_COLOR} />
                                <Text style={styles.rating}>{item.rating}</Text>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 18,
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
    summaryBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,
        alignItems: 'center',
    },
    avgRating: {
        fontSize: 36,
        fontFamily: 'Poppins-Bold',
        color: '#0F1831',
        marginBottom: 2,
    },
    reviewCount: {
        fontSize: 12,
        color: '#8C95A8',
        fontFamily: 'Poppins-Regular',
        marginTop: 2,
        textAlign: 'center',
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    barLabel: {
        fontSize: 12,
        color: '#8C95A8',
        width: 16,
        fontFamily: 'Poppins-Regular',
    },
    barBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#E9ECF2',
        borderRadius: 3,
        marginHorizontal: 6,
        overflow: 'hidden',
    },
    barFill: {
        height: 6,
        backgroundColor: PRIMARY,
        borderRadius: 3,
    },
    barCount: {
        fontSize: 12,
        color: '#8C95A8',
        width: 28,
        fontFamily: 'Poppins-Regular',
        textAlign: 'right',
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#0F1831',
        marginBottom: 8,
    },
    reviewRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 40,
        marginRight: 12,
        borderWidth: 2,
        borderColor: COLORS.PRIMARY,
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
        marginTop: 2,
        marginBottom: 2,
    },
    rating: {
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        color: '#0F1831',
        marginLeft: 4,
    },
});

export default ReviewScreen;
