import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class MusicView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
    };
  }
  onSwipeUp(gestureState) {
    Actions.jump('stopwatch');
  }

  onSwipeDown(gestureState) {
    Actions.jump('time');
  }

  onSwipeLeft(gestureState) {
    Actions.jump('calculator');
  }

  onSwipeRight(gestureState) {
    Actions.jump('music');
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        Actions.jump('stopwatch');
        break;
      case SWIPE_DOWN:
        Actions.jump('time');
        break;
      case SWIPE_LEFT:
        Actions.jump('calculator');
        break;
      case SWIPE_RIGHT:
        Actions.jump('music');
        break;
    }
  }
  render() {
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        style={styles.container}>
        <Text style={styles.text}>Music</Text>
      </GestureRecognizer>
    );
  }
}

export default MusicView;
