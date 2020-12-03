import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {msToTime} from '../../../util/time-formatter';

function Item(props) {
  const theme = useTheme();

  return <ItemClass {...props} theme={theme} />;
}
class ItemClass extends PureComponent {
  render() {
    const {theme} = this.props;
    return (
      <View style={styles.lapRow}>
        <View style={styles.lapStyle}>
          <View style={styles.lapBoxStyle} />
          <Text style={[styles.lapNumber, {color: theme.colors.text}]}>
            {this.props.index + 1}
          </Text>
        </View>
        <View style={styles.lapStyle}>
          <Text style={[styles.lapTime, {color: theme.colors.text}]}>
            {msToTime(this.props.item)}
          </Text>
        </View>
      </View>
    );
  }
}

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
    }, 10);
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
            {msToTime(this.state.lapTimer)}
          </Text>

          <Text style={[styles.mainTimer, {color: theme.colors.text}]}>
            {msToTime(this.state.mainTimer)}
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
          onPress={this.handleLapReset.bind(this)}
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.text,
              underlayColor: theme.colors.disabled,
              shadowColor: theme.colors.text,
            },
          ]}>
          <Text style={[styles.lapResetBtn, {color: theme.colors.background}]}>
            {this.state.mainTimerStart && !this.state.isRunning
              ? 'Reset'
              : 'Lap'}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.handleStartStop.bind(this)}
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.text,
              underlayColor: theme.colors.disabled,
              shadowColor: theme.colors.text,
            },
          ]}>
          <Text
            style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>
            {this.state.isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  _renderLaps() {
    const {theme} = this.props;
    return (
      <View style={{backgroundColor: theme.colors.background}}>
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
    return <Item item={item} index={index} />;
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
  },
  bottom: {
    flex: 2,
  },
  mainTimer: {
    fontSize: 45,
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
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
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
    flex: 1.5,
  },
  lapTime: {
    flexDirection: 'row',
    fontSize: 20,
    fontFamily: 'CircularStd-Book',
    flex: 1,
  },
  startBtn: {
    color: '#0C0',
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  stopBtn: {
    color: '#C00',
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  lapsWrapper: {
    backgroundColor: '#fff',
  },
  lapResetBtn: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  lapStyle: {
    width: '50%',
    flexDirection: 'row',
  },
  lapBoxStyle: {
    flexDirection: 'row',
    flex: 1,
  },
});
export default function StopwatchScreen(props) {
  const theme = useTheme();

  return <Stopwatch {...props} theme={theme} />;
}
