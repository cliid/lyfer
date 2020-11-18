import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useTheme} from './theme/ThemeContext';
import {Toggle} from './Toggle';

const config = {
  count: {
    name: 'Layer',
    type: 'number',
    default: 5,
    min: 1,
    max: 10,
  },
  peak: {
    name: 'Peak',
    type: 'number',
    default: 5,
    min: 2,
    max: 20,
  },
  c1: {
    name: 'Start',
    type: 'color',
    default: '#f0f',
  },
  c2: {
    name: 'End',
    type: 'color',
    default: '#0ff',
  },
  opacity: {
    name: 'Opacity',
    type: 'number',
    default: 0.4,
    min: 0.1,
    max: 0.9,
    step: 0.01,
    priority: 3.1,
  },
  speed: {
    default: 0.1,
  },
  background: {
    default: '#fff',
  },
  palette: {
    default: {
      colors: ['#f0f', '#0ff'],
    },
  },
  dy: {
    type: 'number',
    name: 'Slope',
    min: 0,
    max: 1,
    default: 0.13,
    step: 0.01,
  },
  scale: {
    type: 'number',
    name: 'Scale',
    min: 0,
    max: 1,
    default: 0.11,
    step: 0.01,
  },
  offset: {
    type: 'number',
    name: 'Offset',
    min: 0,
    max: 1,
    default: 0.5,
    step: 0.01,
  },
  transparent: {
    hidden: false,
  },
};
function TimeView() {
  const [curTime, setCurTime] = useState();
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
    toggle: {},
  });

  useEffect(() => {
    setInterval(() => setCurTime(new Date().toTimeString().split(' ')[0]), 1);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{curTime}</Text>
      <Toggle style={styles.toggle} />
    </View>
  );
}

export default TimeView;
