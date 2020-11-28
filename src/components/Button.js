import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const CalcBtn = ({text, colors, onPress, isZero}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isZero
          ? [styles.isZeroContainer, {backgroundColor: colors.background}]
          : [styles.container, {backgroundColor: colors.background}]
      }>
      <Text style={[styles.text, {color: colors.text}]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isZeroContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'CircularStd-Book',
    fontSize: 25,
  },
});
export default CalcBtn;
