import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

let laps = [
  {name: 'Lap 1', value: '00:00.01'},
  {name: 'Lap 2', value: '00:00.02'},
  {name: 'Lap 3', value: '00:00.03'},
  {name: 'Lap 4', value: '00:00.04'},
  {name: 'Lap 5', value: '00:00.05'},
];
function StopwatchScreen() {
  const {colors} = useTheme();
  const [data, setData] = React.useState(laps);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    timerWrapper: {
      backgroundColor: colors.background,
      justifyContent: 'center',
      flex: 1,
    },
    timerWrapperInner: {
      borderWidth: 0.5,
      alignSelf: 'center',
    },
    top: {
      flex: 1,
    },
    bottom: {
      flex: 2,
      backgroundColor: colors.border,
    },
    mainTimer: {
      fontSize: 60,
      fontFamily: 'SF-Pro-Display-Regular',
      fontWeight: '100',
      borderWidth: 0.5,
      alignSelf: 'flex-end',
    },
    lapTimer: {
      fontSize: 18,
      fontFamily: 'SF-Pro-Display-Regular',
      borderWidth: 0.5,
      alignSelf: 'flex-end',
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 15,
      paddingBottom: 30,
    },
    button: {
      height: 80,
      width: 80,
      borderRadius: 40,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lapRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 40,
      paddingTop: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.card,
    },
    lapNumber: {
      fontSize: 16,
      color: colors.border,
    },
    lapTime: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '300',
    },
  });

  function renderTimers() {
    return (
      <View style={styles.timerWrapper}>
        <View style={styles.timerWrapperInner}>
          <Text style={styles.lapTimer}>00:00.95</Text>
          <Text style={styles.mainTimer}>00:02.95</Text>
        </View>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View style={styles.buttonWrapper}>
        <TouchableRipple onPress={() => handleLapReset()} style={styles.button}>
          <Text>Lap</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => handleStartStop()}
          style={styles.button}>
          <Text>Start</Text>
        </TouchableRipple>
      </View>
    );
  }

  function renderLaps() {
    return (
      <View style={styles.lapsWrapper}>
        <FlatList
          enableEmptySections
          data={data}
          renderItem={(rowParameter) => {
            const rowData = rowParameter.item;
            return (
              <View style={styles.lapRow}>
                <Text style={styles.lapNumber}>{rowData.name}</Text>
                <Text style={styles.lapTime}>{rowData.value}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.top}>{renderTimers()}</Text>
      <Text style={styles.bottom}>{renderButtons()}</Text>
    </View>
  );
}

export default StopwatchScreen;
