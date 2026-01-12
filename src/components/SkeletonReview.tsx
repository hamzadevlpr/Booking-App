import React from 'react';
import { StyleSheet, View } from 'react-native';

const SkeletonReview = () => {
  return (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={styles.lineShort} />
        <View style={styles.lineLong} />
      </View>
      <View style={styles.star} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 40,
    backgroundColor: '#E9ECF2',
    marginRight: 12,
  },
  lineShort: {
    width: '60%',
    height: 12,
    backgroundColor: '#E9ECF2',
    borderRadius: 6,
    marginBottom: 8,
  },
  lineLong: {
    width: '90%',
    height: 12,
    backgroundColor: '#E9ECF2',
    borderRadius: 6,
  },
  star: {
    width: 32,
    height: 16,
    backgroundColor: '#E9ECF2',
    borderRadius: 8,
    marginLeft: 8,
    marginTop: 8,
  },
});

export default SkeletonReview;
