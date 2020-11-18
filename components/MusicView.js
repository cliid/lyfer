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
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class MusicView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Music</Text>
      </View>
    );
  }
}

export default MusicView;
