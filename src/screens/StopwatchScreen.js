import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import TimeFormatter from 'minutes-seconds-milliseconds';
class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laps: [],
      isRunning: false,
      mainTimer: null,
      lapTimer: null,
      mainTimerStart: null,
      lapTimerStart: null,
    };
  }

  handleLapReset() {
    let {isRunning, mainTimerStart, lapTimer} = this.state;
    if (mainTimerStart) {
      if (isRunning) {
        const d = new Date();
        this.setState({
          lapTimerStart: d,
          lapTimer: d - this.state.lapTimerStart + lapTimer,
          laps: this.state.laps.concat([d - this.state.lapTimerStart]),
        });
        return;
      }
      this.state.laps = [];
      this.setState({
        mainTimerStart: null,
        lapTimerStart: null,
        mainTimer: 0,
        lapTimer: 0,
      });
    }
  }
  handleStartStop() {
    let {isRunning, mainTimer, lapTimer} = this.state;
    if (isRunning) {
      clearInterval(this.interval);
      this.setState({
        isRunning: false,
      });
      return;
    }
    const d = new Date();
    this.setState({
      mainTimerStart: d,
      lapTimerStart: d,
      isRunning: true,
    });

    this.interval = setInterval(() => {
      const t = new Date();
      this.setState({
        mainTimer: t - this.state.mainTimerStart + mainTimer,
        lapTimer: t - this.state.lapTimerStart + lapTimer,
      });
    }, 1);
  }
  _renderTimers() {
    const {theme} = this.props;
    return (
      <View
        style={[
          styles.timerWrapper,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={styles.timerWrapperInner}>
          <Text style={[styles.lapTimer, {color: theme.colors.text}]}>
            {TimeFormatter(this.state.lapTimer)}
          </Text>

          <Text style={[styles.mainTimer, {color: theme.colors.text}]}>
            {TimeFormatter(this.state.mainTimer)}
          </Text>
        </View>
      </View>
    );
  }
  _renderButtons() {
    const {theme} = this.props;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          underlayColor={theme.colors.disabled}
          onPress={this.handleLapReset.bind(this)}
          style={[styles.button, {backgroundColor: theme.colors.background}]}>
          <Text style={[styles.lapResetBtn, {color: theme.colors.text}]}>
            {this.state.mainTimerStart && !this.state.isRunning
              ? 'Reset'
              : 'Lap'}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={theme.colors.disabled}
          onPress={this.handleStartStop.bind(this)}
          style={[styles.button, {backgroundColor: theme.colors.background}]}>
          <Text
            style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>
            {this.state.isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  _renderLaps() {
    return (
      <View style={styles.lapsWrapper}>
        <FlatList
          data={this.state.laps}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
  keyExtractor(item, index) {
    return index.toString();
  }
  renderItem({item, index}) {
    return (
      <View style={styles.lapRow}>
        <View style={{width: '40%', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', flex: 1}} />
          <Text style={styles.lapNumber}>{index + 1}</Text>
        </View>
        <View style={{width: '40%', flexDirection: 'row'}}>
          <Text style={styles.lapTime}>{TimeFormatter(item)}</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>{this._renderTimers()}</View>
        <View style={styles.middle}>{this._renderButtons()}</View>
        <View style={styles.bottom}>{this._renderLaps()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  timerWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  top: {
    flex: 1,
  },
  middle: {
    flex: 1,
    backgroundColor: '#F0EFF5',
  },
  bottom: {
    flex: 2,
  },
  mainTimer: {
    fontSize: 50,
    fontFamily: 'CircularStd-Medium',
    alignSelf: 'center',
  },
  lapTimer: {
    fontSize: 18,
    fontFamily: 'CircularStd-Medium',
    alignSelf: 'flex-end',
  },
  timerWrapperInner: {
    alignSelf: 'center',
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
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingTop: 10,
  },
  lapNumber: {
    flexDirection: 'row',
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    color: '#777',
    flex: 1,
  },
  lapTime: {
    flexDirection: 'row',
    color: '#000',
    fontSize: 20,
    fontFamily: 'CircularStd-Book',
    flex: 1,
  },
  startBtn: {
    color: '#0C0',
    fontFamily: 'CircularStd-Book',
  },
  stopBtn: {
    color: '#C00',
    fontFamily: 'CircularStd-Book',
  },
  lapsWrapper: {
    backgroundColor: '#ddd',
  },
  lapResetBtn: {
    fontFamily: 'CircularStd-Book',
  },
});
export default function StopwatchScreen(props) {
  const theme = useTheme();

  return <Stopwatch {...props} theme={theme} />;
}
