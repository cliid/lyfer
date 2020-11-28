import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const style = StyleSheet.create({
  container: {},
});

const aboutSlide = ({label, right}) => {
  return (
    <View style={{flex: 1}}>
      <Text>{label}</Text>
    </View>
  );
};

export default aboutSlide;
