import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StatusBar,
  ViewToken,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

// Temporary remote images; replace with local assets when available
const slides = [
  {
    key: '1',
    title: 'Luxury and Comfort,\nJust a Tap Away',
    subtitle:
      'Semper in cursus magna et at varius nunc adipiscing. Elementum justo, laoreet id sem.',
    image:
      'https://images.unsplash.com/photo-1562790351-d273a961e0e9?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Continue',
  },
  {
    key: '2',
    title: 'Book with Ease, Stay\nwith Style',
    subtitle:
      'Semper in cursus magna et at varius nunc adipiscing. Elementum justo, laoreet id sem.',
    image:
      'https://images.unsplash.com/photo-1703578531200-5c0dcbdbef5b?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Continue',
  },
  {
    key: '3',
    title: 'Discover Your Dream\nHotel, Effortlessly',
    subtitle:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    image:
      'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Get Started',
  },
] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const DOT_SIZE = 6;
const ACTIVE_DOT_WIDTH = 18;
const PRIMARY = '#2853AF';

const OnboardingScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onNext = () => {
    if (index < slides.length - 1) {
      const next = index + 1;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    } else {
      navigation.replace('Home');
    }
  };

  const renderItem: ListRenderItem<(typeof slides)[number]> = ({ item }) => (
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.slide}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0.85)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 20) }]}>        
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Paginator currentIndex={index} total={slides.length} />
        <TouchableOpacity onPress={onNext} activeOpacity={0.8} style={styles.cta}>
          <Text style={styles.ctaText}>{item.cta}</Text>
        </TouchableOpacity>
        {item.key === '3' && (
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken<(typeof slides)[number]>> }) => {
      const i = viewableItems?.[0]?.index ?? 0;
      if (typeof i === 'number') setIndex(i);
    },
  ).current;

  const viewabilityConfig = useMemo(
    () => ({ viewAreaCoveragePercentThreshold: 60 }),
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(it) => it.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

const Paginator = ({ currentIndex, total }: { currentIndex: number; total: number }) => {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === currentIndex;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              active ? styles.activeDot : null,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  slide: { width, height },
  bottom: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 0,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 12,
    fontSize: 13,
    lineHeight: 18,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 18,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  activeDot: {
    width: ACTIVE_DOT_WIDTH,
    backgroundColor: '#fff',
    borderRadius: DOT_SIZE / 2,
  },
  cta: {
    marginTop: 18,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footerRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { color: 'rgba(255,255,255,0.8)' },
  link: { color: '#92B3FF' },
});

export default OnboardingScreen;
