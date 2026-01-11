// components/LoadingButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { FONTS } from '../theme/theme';

type Props = {
  title: string;
  loading?: boolean;
  onPress: () => void;
  style?: any;
};

const LoadingButton = ({ title, loading, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;

const styles = StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: '#2853AF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontFamily: FONTS.SEMI_BOLD,
  },
});
