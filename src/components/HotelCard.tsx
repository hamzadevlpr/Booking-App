import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './HotelCard.styles';
import BathroomIcon from '../assets/icons/bathroom.svg';
import HeartIcon from '../assets/icons/Heart.svg';
import Bedcon from '../assets/icons/bed.svg';

interface HotelCardProps {
    data: {
        id: string;
        title: string;
        location: {
            location: string;
        };
        price: number;
        rating: number;
        beds: number;
        baths: number;
        image: any;
    };
    onPressHeart: () => void;
    isFavorite?: boolean;
}
const HotelCard = ({
    data, onPressHeart, isFavorite
}: HotelCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageWrap}>
                <Image source={{ uri: data.image }} style={styles.image} resizeMode="cover" />
                <View style={styles.ratingBadge}>
                    <Icon name="star" size={14} color="#fff" style={styles.ratingStar} />
                    <Text style={styles.ratingText}>{data.rating}</Text>
                </View>
                <TouchableOpacity style={styles.heartBtn} onPress={onPressHeart}>
                    <HeartIcon width={20} height={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.infoWrap}>
                <View style={styles.rowBetween}>
                    <Text style={styles.name}>{data.title}</Text>
                    <Text style={styles.price}>${data.price}</Text>
                </View>
                <View style={styles.rowBetween}>
                    <Text style={styles.location}>{data.location.location}</Text>
                    <Text style={styles.perNight}>Per Night</Text>
                </View>
                <View style={styles.rowAmenities}>
                    <Bedcon width={16} height={16} style={styles.amenityIcon} />
                    <Text style={styles.amenityText}>{data.bed} bed</Text>
                    <Text style={styles.dot}>·</Text>
                    <BathroomIcon width={16} height={16} style={styles.amenityIcon} />
                    <Text style={styles.amenityText}>{data.bath} bathroom</Text>
                </View>
            </View>
        </View>
    )
}

export default HotelCard;
