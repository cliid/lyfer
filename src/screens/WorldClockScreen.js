import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

function WorldClockScreen() {
  const [curTime, setCurTime] = useState('00:00:00');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    time: {
      fontSize: 50,
      fontFamily: 'CircularStd-Medium',
      textAlign: 'center',
      margin: 10,
    },
  });

  useEffect(() => {
    setInterval(() => setCurTime(new Date().toTimeString().split(' ')[0]), 1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{curTime}</Text>
    </View>
  );
}

export default WorldClockScreen;
