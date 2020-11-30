import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {msToHHMMSS} from '../../util/time-formatter';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isTimeSet: false,
      time: new Date(0),
      show: false,
    };
  }

  onChange = (event, selectedTime) => {
    if (event.type === 'set') {
      this.setState({
        time: selectedTime,
        show: false,
        isTimeSet: true,
      });
    } else if (event.type === 'dismissed') {
      this.setState({
        show: false,
      });
    }
  };

  clickTime() {
    this.setState({
      show: true,
    });
  }
  clickStartBtn() {
    if (!this.state.isTimeSet) {
      this.setState({
        show: true,
      });
    } else {
      if (!this.state.isRunning) {
        this.change();
      }
    }
  }

  clickPauseBtn() {
    clearInterval(this.interval);
    this.setState({
      isRunning: false,
    });
  }

  clickResetBtn() {
    clearInterval(this.interval);
    this.setState({
      isRunning: false,
    });
  }
  change() {
    if (this.state.isTimeSet) {
      if (this.state.time > 0) {
        this.interval = setInterval(() => {
          this.setState({
            time: this.state.time - 10,
          });
          console.log(this.state.time);
        }, 10);
      } else {
        console.log('timer done');
      }
    }
  }

  _renderTimer() {
    return (
      <View
        style={[
          styles.timerWrapper,
          {backgroundColor: this.props.theme.colors.background},
        ]}>
        <TouchableHighlight
          underlayColor={this.props.theme.colors.background}
          onPress={this.clickTime}
          style={styles.time}>
          <Text style={[styles.time, {color: this.props.theme.colors.text}]}>
            {msToHHMMSS(this.state.time)}
          </Text>
        </TouchableHighlight>
        {this.state.show && (
          <RNDateTimePicker
            value={this.state.time}
            mode="time"
            display="spinner"
            onChange={this.onChange}
          />
        )}
      </View>
    );
  }

  _renderButtons() {
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          underlayColor={this.props.theme.colors.disabled}
          onPress={this.clickStartBtn}
          style={[
            styles.button,
            {backgroundColor: this.props.theme.colors.background},
          ]}>
          <Text
            style={[styles.startBtn, {color: this.props.theme.colors.text}]}>
            Start
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={this.props.theme.colors.disabled}
          onPress={this.clickPauseBtn}
          style={[
            styles.button,
            {backgroundColor: this.props.theme.colors.background},
          ]}>
          <Text
            style={[styles.pauseBtn, {color: this.props.theme.colors.text}]}>
            Pause
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={this.props.theme.colors.disabled}
          onPress={this.clickResetBtn}
          style={[
            styles.button,
            {
              backgroundColor: this.props.theme.colors.background,
              color: this.props.theme.colors.text,
            },
          ]}>
          <Text
            style={[styles.resetBtn, {color: this.props.theme.colors.text}]}>
            Reset
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: this.props.theme.colors.background},
        ]}>
        <View style={styles.top}>{this._renderTimer()}</View>
        <View style={styles.bottom}>{this._renderButtons()}</View>
      </View>
    );
  }
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

export default function TimerScreen(props) {
  const theme = useTheme();

  return <Timer {...props} theme={theme} />;
}
