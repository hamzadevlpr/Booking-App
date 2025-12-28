import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
          <View style={styles.markerContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle} />
            </View>
          </View>
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
    paddingHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 5,
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
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(40, 83, 175, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2853AF',
    borderWidth: 3,
    borderColor: '#fff',
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#a8dba8',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
];