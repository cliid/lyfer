import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {msToHHMMSS} from '../util/time-formatter';

function TimerScreen() {
  const {colors} = useTheme();

  const [isRunning, setIsRunning] = useState(false);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [time, setTime] = useState(new Date(0));
  const [show, setShow] = useState(false);

  let interval;

  const onChange = (event, selectedTime) => {
    if (event.type === 'set') {
      setTime(selectedTime);
      setShow(false);
      setIsTimeSet(true);
    } else if (event.type === 'dismissed') {
      setShow(false);
    }
  };

  function clickTime() {
    setShow(true);
  }
  function clickStartBtn() {
    if (!isTimeSet) {
      setShow(true);
    } else {
      if (!isRunning) {
        change();
      }
    }
  }

  function clickPauseBtn() {
    clearInterval(interval);
    setIsRunning(false);
  }

  function clickResetBtn() {
    clearInterval(interval);
    setIsRunning(false);
  }
  function change() {
    if (isTimeSet) {
      if (time > 0) {
        interval = setInterval(() => {
          setTime(time - 10);
          console.log(time);
        }, 10);
      } else {
        console.log('timer done');
      }
    }
  }

  function _renderTimer() {
    return (
      <View style={[styles.timerWrapper, {backgroundColor: colors.background}]}>
        <TouchableHighlight
          underlayColor={colors.background}
          onPress={clickTime}
          style={styles.time}>
          <Text style={[styles.time, {color: colors.text}]}>
            {msToHHMMSS(time)}
          </Text>
        </TouchableHighlight>
        {show && (
          <RNDateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>
    );
  }

  function _renderButtons() {
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          underlayColor={colors.disabled}
          onPress={clickStartBtn}
          style={[styles.button, {backgroundColor: colors.background}]}>
          <Text style={[styles.startBtn, {color: colors.text}]}>Start</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.disabled}
          onPress={clickPauseBtn}
          style={[styles.button, {backgroundColor: colors.background}]}>
          <Text style={[styles.pauseBtn, {color: colors.text}]}>Pause</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors.disabled}
          onPress={clickResetBtn}
          style={[
            styles.button,
            {backgroundColor: colors.background, color: colors.text},
          ]}>
          <Text style={[styles.resetBtn, {color: colors.text}]}>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.top}>{_renderTimer()}</View>
      <View style={styles.bottom}>{_renderButtons()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },

  time: {
    fontSize: 50,
    fontFamily: 'CircularStd-Medium',
    textAlign: 'center',
  },

  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  startBtn: {
    color: '#0C0',
    fontFamily: 'CircularStd-Book',
  },
  pauseBtn: {
    color: '#C00',
    fontFamily: 'CircularStd-Book',
  },
  resetBtn: {
    fontFamily: 'CircularStd-Book',
  },
});

export default TimerScreen;
