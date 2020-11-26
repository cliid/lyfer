import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

function AboutScreen() {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    time: {
      fontSize: 50,
      textAlign: 'center',
      color: colors.text,
      margin: 10,
    },
  });

  const state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>TimerScreen</Text>
    </View>
  );
}

export default AboutScreen;
