import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {Actions} from 'react-native-router-flux';
import {useTheme} from './theme/ThemeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  time: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

function TimerView() {
  const [timerStart, setTimerStart] = useState(false);
  const [totalDuration, setTotalDuration] = useState(1000);
  const [timerReset, setTimerReset] = useState(false);
  let currentTime = null;

  function toggleTimer() {
    setTimerStart(!timerStart);
    setTimerReset(false);
  }

  function resetTimer() {
    setTimerStart(false);
    setTimerReset(true);
  }

  function getFormattedTime(time) {
    currentTime = time;
  }
  return (
    <View style={styles.container}>
      <Timer
        totalDuration={totalDuration}
        msecs
        start={timerStart}
        reset={timerReset}
        options={options}
        handleFinish={handleTimerComplete}
        getTime={getFormattedTime}
      />
      <TouchableHighlight onPress={toggleTimer}>
        <Text style={{fontSize: 30}}>{!timerStart ? 'Start' : 'Stop'}</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={resetTimer}>
        <Text style={{fontSize: 30}}>Reset</Text>
      </TouchableHighlight>
    </View>
  );
}
const handleTimerComplete = () => alert('custom completion function');

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default TimerView;
