import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
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

  function queryWolfram(text) {
    console.log(fetch('https://wolframalpha.com/input/?i=' + encodeURI(text)));
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.time}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        onSubmitEditing={() => queryWolfram(value)}
      />
    </View>
  );
}

export default CalculatorScreen;
