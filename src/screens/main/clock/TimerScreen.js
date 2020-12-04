import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {decimalToHHMMSS, msToHHMMSS} from '../../../util/time-formatter';
import VirtualKeyboard from '../../../components/VirtualKeyboard';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isTimeSet: false,
      timer: 0,
      settingTimer: 0,
      timerStart: null,
      initialTime: null,
    };
    this._pressNextBtn = this._pressNextBtn.bind(this);
  }

  handleGoBack() {
    clearInterval(this.interval);
    this.setState({
      isRunning: false,
      isTimeSet: false,
      timer: 0,
      settingTimer: 0,
      timerStart: null,
      initialTime: null,
    });
  }

  _pressNextBtn() {
    if (!(this.state.timer === 0)) {
      this.setState({initialTime: this.state.timer, isTimeSet: true});
      this.handleStartPause();
    }
  }

  handleReset() {
    let {timerStart} = this.state;
    if (timerStart) {
      this.setState({
        timer: this.state.initialTime,
      });
      clearInterval(this.interval);
    }
    this.setState({
      timer: this.state.initialTime,
      isRunning: false,
    });
  }
  handleStartPause() {
    let {isRunning} = this.state;
    if (isRunning) {
      clearInterval(this.interval);
      this.setState({
        isRunning: false,
      });
      return;
    }
    this.setState({
      timerStart: this.state.timer,
      isRunning: true,
    });
    this.interval = setInterval(() => {
      if (this.state.timer <= 0) {
        alert('Done');
        clearInterval(this.interval);
        this.setState({
          isRunning: false,
          timer: this.state.initialTime,
        });
      } else {
        this.setState({
          timer: this.state.timer - 10,
        });
      }
    }, 10);
  }

  _renderTimer() {
    const {theme} = this.props;
    return (
      <View
        style={[
          styles.timerWrapper,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={styles.timerWrapperInner}>
          <Text style={[styles.timer, {color: theme.colors.text}]}>
            {msToHHMMSS(this.state.timer)}
          </Text>
        </View>
      </View>
    );
  }

  _renderButtons() {
    const {theme} = this.props;
    return (
      <View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            onPress={this.handleReset.bind(this)}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.text,
                underlayColor: theme.colors.disabled,
                shadowColor: theme.colors.text,
              },
            ]}>
            <Text
              style={[styles.resetBtnText, {color: theme.colors.background}]}>
              Reset
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.handleStartPause.bind(this)}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.text,
                underlayColor: theme.colors.disabled,
                shadowColor: theme.colors.text,
              },
            ]}>
            <Text
              style={[
                styles.startBtnText,
                this.state.isRunning && [
                  styles.pauseBtnText,
                  {color: theme.colors.background},
                ],
              ]}>
              {this.state.isRunning ? 'Pause' : 'Start'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.goBackBtnWrapper}>
          <TouchableHighlight
            onPress={this.handleGoBack.bind(this)}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.text,
                underlayColor: theme.colors.disabled,
                shadowColor: theme.colors.text,
              },
            ]}>
            <Text
              style={[styles.goBackBtnText, {color: theme.colors.background}]}>
              Go Back
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _renderVirtualKeyboard() {
    const {theme} = this.props;
    if (this.state.settingTimer.toString().length < 6) {
      return (
        <View style={styles.virtualKeyboard}>
          <VirtualKeyboard
            onPress={(val) => {
              console.log(val);
              this.setState({
                settingTimer: val,
                timer:
                  1000 *
                  (Math.floor(val / 10000) * 3600 +
                    Math.floor((val % 10000) / 100) * 60 +
                    (val % 100)),
              });
            }}
            color={theme.colors.text}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.virtualKeyboard}>
          <VirtualKeyboard onPress={() => {}} color={theme.colors.text} />
        </View>
      );
    }
  }

  _renderTimerSetting() {
    const {theme} = this.props;
    return (
      <View style={styles.virtualKeyboardWrapper}>
        <Text
          numberOfLines={1}
          style={[styles.textInput, {color: theme.colors.text}]}>
          {decimalToHHMMSS(this.state.settingTimer)}
        </Text>
        {this._renderVirtualKeyboard()}
        <TouchableHighlight
          onPress={this._pressNextBtn}
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.text,
              underlayColor: theme.colors.disabled,
              shadowColor: theme.colors.text,
              marginTop: 40,
            },
          ]}>
          <Text style={[styles.nextBtnText, {color: theme.colors.background}]}>
            Next
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderTimerComponents() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.middle}>{this._renderTimer()}</View>
        <View style={styles.bottom}>{this._renderButtons()}</View>
      </View>
    );
  }

  render() {
    const {theme} = this.props;
    let toRender;
    if (this.state.isTimeSet) {
      toRender = this._renderTimerComponents();
    } else {
      toRender = this._renderTimerSetting();
    }
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        {toRender}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  virtualKeyboardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualKeyboard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  middle: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  timer: {
    fontSize: 45,
    fontFamily: 'CircularStd-Medium',
    alignSelf: 'center',
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
  goBackBtnWrapper: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  startBtnText: {
    color: '#0C0',
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  pauseBtnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  resetBtnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  nextBtnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  goBackBtnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
  textInput: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 45,
  },
});

export default function TimerScreen(props) {
  const theme = useTheme();

  return <Timer {...props} theme={theme} />;
}
