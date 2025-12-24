import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{
        fontSize: 24,
        fontFamily: "Poppins-ExtraBold",
      }}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
