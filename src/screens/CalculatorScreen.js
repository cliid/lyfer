import React from 'react';
import {StyleSheet, Dimensions, PanResponder, View, Text } from 'react-native';
import {useTheme} from '@react-navigation/native';

function CalculatorScreen() {
  const [value, onChangeText] = React.useState('Input');
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    time: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.text,
      margin: 10,
    },
  });

  

}

export default CalculatorScreen;
