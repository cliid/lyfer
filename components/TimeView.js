import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useTheme} from './theme/ThemeContext';
import {Toggle} from './Toggle';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function TimeView() {
  const [curTime, setCurTime] = useState();
  const [gestureName, setGestureName] = useState('none');
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
      fontFamily: 'NexaBold',
      textAlign: 'center',
      color: colors.text,
      margin: 10,
    },
    toggle: {},
    button: {
      fontSize: 20,
      fontFamily: 'NexaBold',
      textAlign: 'center',
      color: colors.text,
    },
  });

  useEffect(() => {
    setInterval(() => setCurTime(new Date().toTimeString().split(' ')[0]), 1);
  });

  function onSwipeUp(gestureState) {
    Actions.jump('stopwatch');
  }

  function onSwipeDown(gestureState) {
    Actions.jump('timer');
  }

  function onSwipeLeft(gestureState) {
    Actions.jump('calculator');
  }

  function onSwipeRight(gestureState) {
    Actions.jump('music');
  }

  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setGestureName(gestureName);
    switch (gestureName) {
      case SWIPE_UP:
        Actions.jump('stopwatch');
        break;
      case SWIPE_DOWN:
        Actions.jump('timer');
        break;
      case SWIPE_LEFT:
        Actions.jump('calculator');
        break;
      case SWIPE_RIGHT:
        Actions.jump('music');
        break;
    }
  }

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      onSwipeUp={(state) => onSwipeUp(state)}
      onSwipeDown={(state) => onSwipeDown(state)}
      onSwipeLeft={(state) => onSwipeLeft(state)}
      onSwipeRight={(state) => onSwipeRight(state)}
      style={styles.container}>
      <Text style={styles.time}>{curTime}</Text>
      <Toggle style={styles.toggle} />
    </GestureRecognizer>
  );
}

export default TimeView;
