import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

type MapCardProps = {
  latitude: number;
  longitude: number;
  title?: string;
  location?: string;
  image?: string;
};

const MapCard: React.FC<MapCardProps> = ({ latitude, longitude, title, location, image }) => {
  const [mapReady, setMapReady] = useState(false);

  const handleMapReady = () => {
    setMapReady(true);
  };

  return (
    <View style={styles.card}>
      {!mapReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2853AF" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map, !mapReady && styles.mapHidden]}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
        scrollEnabled={false}  
        zoomEnabled={false}    
        pitchEnabled={false}   
        rotateEnabled={false}  
        pointerEvents="none"
        onMapReady={handleMapReady}
        loadingEnabled={true}
        loadingIndicatorColor="#2853AF"
        customMapStyle={mapStyle}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={title}
          description={location}
        >
          <Svg width={48} height={48}>
            {/* Blue outer circle */}
            <Circle cx={24} cy={20} r={16} fill="#2853AF" />
            {/* White center */}
            <Circle cx={24} cy={20} r={8} fill="#fff" />
            {/* Green dot at bottom center */}
            <Circle cx={24} cy={38} r={5} fill="#3EC28F" stroke="#fff" strokeWidth={2} />
          </Svg>
        </Marker>
      </MapView>
    </View>
  );
};

export default MapCard;

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  map: { 
    width: '100%', 
    height: '100%' 
  },
  mapHidden: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F2F3F7',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#2853AF',
    fontFamily: 'Poppins-Medium',
  },
  // Marker styles removed; now using SVG
});

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#f7f7f7' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#b0b0b0' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f7f7f7' }] },
  { featureType: 'administrative', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ededed' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e0e0e0' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e3e3e3' }] },
  { featureType: 'landscape', stylers: [{ color: '#f7f7f7' }] },
];