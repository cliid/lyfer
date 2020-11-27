import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TimeFormatter from 'minutes-seconds-milliseconds';

function TimerScreen() {
  const {colors} = useTheme();

  const [isRunning, setIsRunning] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    time: {
      fontSize: 50,
      fontFamily: 'CircularStd-Medium',
      textAlign: 'center',
      color: colors.text,
      margin: 10,
    },
  });

  const onChange = (event, selectedTime) => {
    setTime(selectedTime);
  };

  function clickStartBtn() {
    if(!isTimeSet) {
      setShow(true);
      return;
    }
    if (!isRunning)
      change();
  }

  function clickStopBtn() {
    setIsRunning(false);
  }
  function change() {
    if(isTimeSet) {
      if (time > 0) {
        setInterval(() => {
          setTime(time - 10);
        }, 10);
        return;
      }
      alert('done');
    }
  }

  return (
    <View style={styles.container}>
      {show && (
        <RNDateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={onChange}
        />
      )}
      <TouchableHighlight onPress={clickStartBtn} >Start</TouchableHighlight>
      <TouchableHighlight onPress={clickStopBtn} >Stop</TouchableHighlight>
    </View>
  );
}

export default TimerScreen;
