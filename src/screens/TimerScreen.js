import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

function TimerScreen() {
  const {colors} = useTheme();

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

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          setShow(!show);
          console.error(show);
        }}>
        <Text>Press Me!</Text>
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

export default TimerScreen;
