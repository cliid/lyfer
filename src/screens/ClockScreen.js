import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

function ClockScreen() {
  const [curTime, setCurTime] = useState();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    time: {
      fontSize: 50,
      textAlign: 'center',
      margin: 10,
    },
  });

  useEffect(() => {
    setInterval(() => setCurTime(new Date().toTimeString().split(' ')[0]), 100);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{curTime}</Text>
    </View>
  );
}

export default ClockScreen;
