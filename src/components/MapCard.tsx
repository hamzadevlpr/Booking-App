import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width } = Dimensions.get('window');

type MapCardProps = {
    latitude: number;
    longitude: number;
    title: string;
    location: string;
    image?: string;
};

const MapCard: React.FC<MapCardProps> = ({ latitude, longitude, title, location, image }) => {

    const ASPECT_RATIO = width / 220;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };

    return (
        <View style={styles.card}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                loadingIndicatorColor="#2853AF"
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={title}
                    description={location}
                />
            </MapView>
        </View>
    );
};

export default MapCard;

const styles = StyleSheet.create({
    card: {
        width: width * 0.9,
        height: 220,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 4,
    },
    map: { width: '100%', height: '100%' },
    info: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    thumbnail: { width: 60, height: 60, borderRadius: 12, marginRight: 10 },
    text: { flexShrink: 1 },
    title: { fontWeight: '700', fontSize: 16, marginBottom: 2 },
    location: { fontSize: 13, color: '#555' },
});
