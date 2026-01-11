import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RangeSlider from 'rn-range-slider';

const PRIMARY = '#2853AF';

type Props = {
  min: number;
  max: number;
  onChange: (low: number, high: number) => void;
};

export default function PriceRange({ min, max, onChange }: Props) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.priceText}>${min}–${max}</Text>
      </View>

      <RangeSlider
        min={0}
        max={80}
        step={1}
        low={min}
        high={max}
        renderThumb={() => <View style={styles.thumb} />}
        renderRail={() => <View style={styles.rail} />}
        renderRailSelected={() => <View style={styles.railSelected} />}
        onValueChanged={(low, high) => onChange(low, high)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F1831',
  },
  priceText: {
    fontSize: 12,
    color: '#C0C0C0',
  },
  rail: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  railSelected: {
    height: 4,
    backgroundColor: PRIMARY,
    borderRadius: 2,
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: PRIMARY,
  },
});
