import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Leaderboard from '../../components/Leaderboard';
import {Button, useTheme} from 'react-native-paper';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPage: 1,
      accessToken: (async () => {
        return await AsyncStorage.getItem('access_token');
      })(),
      refreshToken: (async () => {
        return await AsyncStorage.getItem('refresh_token');
      })(),
    };
  }

  componentDidMount() {
    this.getUsers(this.state.currentPage);
  }
  getUsers(page) {
    fetch('https://lyfer.jitcijk.org/v1/users?page=' + page, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + this.state.accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          this.refreshAccessToken();
          this.getUsers(page);
        }
      })
      .then((responseJson) => {});
  }
  refreshAccessToken() {
    const dataToSend = {
      refreshToken: (async () => {
        return await AsyncStorage.getItem('refresh_token');
      })(),
    };
    fetch('https://lyfer.jitcijk.org/v1/auth/refresh-tokens', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.props.navigation.navigate('Auth');
        }
      })
      .then((responseJson) => {
        AsyncStorage.setItem('access_token', responseJson.tokens.access.token);
        AsyncStorage.setItem(
          'refresh_token',
          responseJson.tokens.refresh.token,
        );
      });
  }
  _renderTextInput() {
    return (
      <View>
        <TextInput style={styles.textInput} />
      </View>
    );
  }
  _renderUsers() {
    return (
      <View>
        <TextInput style={styles.textInput} />
      </View>
    );
  }
  _renderLeftRightArrow() {
    return (
      <View style={styles.buttonWrapper}>
        <Button
          title="<"
          style={styles.button}
          onPress={() => {
            this.state.currentPage > 0
              ? this.setState({currentPage: this.state.currentPage - 1})
              : 1;
          }}
        />
        <Button
          title=">"
          style={styles.button}
          onPress={() => {
            this.state.currentPage < this.state.totalPage
              ? this.setState({currentPage: this.state.currentPage + 1})
              : 1;
          }}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>{this._renderTextInput()}</View>
        <View style={styles.middle}>{this._renderUsers()}</View>
        <View style={styles.bottom}>{this._renderLeftRightArrow()}</View>
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
    flex: 4,
  },
  bottom: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default function RankScreen(props) {
  const theme = useTheme();

  return <Rank {...props} theme={theme} />;
}
