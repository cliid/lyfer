import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';

function WorldClockScreen() {
  const [curTime, setCurTime] = useState();
  const {colors} = useTheme();

  useEffect(() => {
    setInterval(() => setCurTime(new Date().toTimeString().split(' ')[0]), 100);
  });

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.time, {color: colors.text}]}>{curTime}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 45,
    fontFamily: 'CircularStd-Medium',
    alignSelf: 'center',
  },
});

export default WorldClockScreen;
