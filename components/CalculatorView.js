import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

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

class CalculatorView extends React.Component {
  state = {
    curTime: null,
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().getTime().toLocaleString(),
      });
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{this.state.curTime}</Text>
        <Button style={styles.button} onClick={Actions.push('music')}>
          to music
        </Button>
      </View>
    );
  }
}

export default CalculatorView;
