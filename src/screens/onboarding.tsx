import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../App';

import OnBoardOne from '../assets/images/onboard1.jpg';
import OnBoardTwo from '../assets/images/onboard2.jpg';
import OnBoardThree from '../assets/images/onboard3.jpg';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Luxury and Comfort,\nJust a Tap Away',
    subtitle: 'Discover the best hotels tailored to your preferences. Experience luxury and comfort like never before.',
    image: OnBoardOne,
  },
  {
    key: '2',
    title: 'Book with Ease,\nStay with Style',
    subtitle: 'Enjoy seamless booking experience with our user-friendly app. Find your perfect stay in just a few taps.',
    image: OnBoardTwo,
  },
  {
    key: '3',
    title: 'Discover Your Dream\nHotel, Effortlessly',
    subtitle: 'Explore a world of hotels at your fingertips. Find the perfect stay that matches your style and budget.',
    image: OnBoardThree,
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const AUTO_SCROLL_INTERVAL = 3000;
const PRIMARY = '#2853AF';

const OnboardingScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  // fade animation for text
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = index === slides.length - 1 ? 0 : index + 1;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [index]);

  // Fade in text when index changes
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: any) => (
    <ImageBackground source={item.image} style={styles.slide}>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={StyleSheet.absoluteFill}
      />

      {/* Bottom to middle overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)', 'rgba(0,0,0,0.95)']}
        locations={[0, 0.5, 1]}
        style={styles.bottomOverlay}
      />

      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          {item.title}
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
          {item.subtitle}
        </Animated.Text>
      </View>
    </ImageBackground>
  );

  const onNext = () => {
    if (index === slides.length - 1) {
      navigation.replace('Main');
    } else {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        ref={listRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}
      />

      {/* PAGINATION DOTS */}
      <View style={styles.paginatorContainer}>
        <Paginator currentIndex={index} total={slides.length} />
      </View>

      {/* FIXED BOTTOM AREA */}
      <View style={[styles.fixedBottom, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.cta} onPress={onNext}>
          <Text style={styles.ctaText}>
            {index === slides.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontFamily: "Poppins-Light",
            marginTop: 12,
            fontSize: 14,
          }}
        >
          Don’t have an account?
          <Text
            style={{ fontFamily: "Poppins-Bold", textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate('SignUp')}
          > Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const Paginator = ({ currentIndex, total }: { currentIndex: number; total: number }) => {
  const animatedWidths = useRef(
    Array.from({ length: total }, () => new Animated.Value(6))
  ).current;

  useEffect(() => {
    animatedWidths.forEach((width, i) => {
      Animated.timing(width, {
        toValue: currentIndex === i ? 18 : 6,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            { width: animatedWidths[i] },
            currentIndex === i && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: { width, height },

  bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.6,
  },

  textContainer: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
  },

  title: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 32,
    fontFamily: "Poppins-ExtraBold",
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  paginatorContainer: {
    position: 'absolute',
    bottom: 160,
    left: 20,
    right: 20,
  },

  fixedBottom: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 0,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  activeDot: {
    backgroundColor: '#2853AF',
  },

  cta: {
    backgroundColor: PRIMARY,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
});

export default OnboardingScreen;
