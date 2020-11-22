import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';
class StopwatchScreen extends Component {
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
    if (mainTimerStart && !isRunning) {
      this.state.laps = [];
      this.setState({
        mainTimerStart: null,
        lapTimerStart: null,
        mainTimer: 0,
        lapTimer: 0,
      });
    } else if (mainTimerStart && isRunning) {
      const currentLapTime = new Date() - this.state.lapTimerStart + lapTimer;

      this.setState({
        lapTimerStart: new Date(),
        lapTimer: new Date() - this.state.lapTimerStart + lapTimer,
        laps: this.state.laps.concat([currentLapTime]),
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
    this.setState({
      mainTimerStart: new Date(),
      lapTimerStart: new Date(),
      isRunning: true,
    });

    this.interval = setInterval(() => {
      this.setState({
        mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
        lapTimer: new Date() - this.state.lapTimerStart + lapTimer,
      });
    }, 30);
  }
  _renderTimers() {
    return (
      <View style={styles.timerWrapper}>
        <View style={styles.timerWrapperInner}>
          <Text style={styles.lapTimer}>
            {TimeFormatter(this.state.lapTimer)}
          </Text>

          <Text style={styles.mainTimer}>
            {TimeFormatter(this.state.mainTimer)}
          </Text>
        </View>
      </View>
    );
  }
  _renderButtons() {
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          underlayColor="#ddd"
          onPress={this.handleLapReset.bind(this)}
          style={styles.button}>
          <Text>
            {this.state.mainTimerStart && !this.state.isRunning
              ? 'Reset'
              : 'Lap'}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ddd"
          onPress={this.handleStartStop.bind(this)}
          style={styles.button}>
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
        <Text style={styles.lapNumber}>{index + 1}</Text>
        <Text style={styles.lapTime}>{TimeFormatter(item)}</Text>
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
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  timerWrapper: {
    backgroundColor: '#FFFFFF',
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
    fontSize: 60,
    fontWeight: '100',
    alignSelf: 'center',
  },
  lapTimer: {
    fontSize: 18,
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
    justifyContent: 'space-evenly',
    height: 40,
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  lapNumber: {
    fontSize: 16,
    color: '#777',
  },
  lapTime: {
    color: '#000',
    fontSize: 20,
    fontWeight: '300',
  },
  startBtn: {
    color: '#0C0',
  },
  stopBtn: {
    color: '#C00',
  },
  lapsWrapper: {
    backgroundColor: '#ddd',
  },
});
export default StopwatchScreen;
