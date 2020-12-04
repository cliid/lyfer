import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Leaderboard from '../../components/Leaderboard';
import {useTheme} from 'react-native-paper';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 1,
      accessToken: null,
      refreshToken: null,
      userList: null,
    };
  }

  componentDidMount() {
    (async () => {
      this.setState({
        accessToken: await AsyncStorage.getItem('access_token'),
        refreshToken: await AsyncStorage.getItem('refresh_token'),
      });
    })();
    this.getUsers();
  }
  getUsers() {
    // change to point system
    fetch(
      'https://lyfer.jitcijk.org/v1/users?sortBy=name:asc&limit=15&&page=' +
        this.state.currentPage,
      {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + this.state.accessToken,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          this.refreshAccessToken();
          this.getUsers();
        }
      })
      .then((responseJson) => {
        this.setState({
          userList: responseJson.results,
          currentPage: responseJson.page,
          totalPages: responseJson.totalPages,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  refreshAccessToken() {
    const dataToSend = {
      refreshToken: this.state.refreshToken,
    };
    fetch('https://lyfer.jitcijk.org/v1/auth/refresh-tokens', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          this.props.navigation.navigate('Auth');
        }
        return response.json();
      })
      .then(async (responseJson) => {
        await AsyncStorage.setItem('access_token', responseJson.access.token);
        await AsyncStorage.setItem('refresh_token', responseJson.refresh.token);
        this.setState({
          accessToken: responseJson.access.token,
          refreshToken: responseJson.refresh.token,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _renderTextInput() {
    return (
      <View style={styles.textInputWrapper}>
        <TextInput style={styles.textInput} />
      </View>
    );
  }
  _renderUsers() {
    const {theme} = this.props;
    return (
      <View style={styles.userListWrapper}>
        <FlatList
          data={this.state.userList}
          renderItem={({item}) => {
            return (
              <View style={styles.userInfo}>
                <Text style={[styles.userName, {color: theme.colors.text}]}>
                  {item.name}
                </Text>
                <Text style={[styles.userUsername, {color: theme.colors.text}]}>
                  @{item.username}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  _renderLeftRightArrow() {
    const {theme} = this.props;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.text,
              color: theme.colors.background,
            },
          ]}
          onPress={() => {
            if (this.state.currentPage > 1) {
              this.setState({currentPage: this.state.currentPage - 1});
              console.log(this.state.currentPage);
              this.getUsers();
            }
          }}>
          <Text style={[styles.buttonText, {color: theme.colors.background}]}>
            {'<'}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.text,
              color: theme.colors.background,
            },
          ]}
          onPress={() => {
            if (this.state.currentPage < this.state.totalPages) {
              this.setState({currentPage: this.state.currentPage + 1});
              console.log(this.state.currentPage);
              this.getUsers();
            }
          }}>
          <Text style={[styles.buttonText, {color: theme.colors.background}]}>
            {'>'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>{this._renderTextInput()}</View>
        <View style={styles.middle}>{this._renderUsers()}</View>
        <View style={styles.bottom}>{this._renderLeftRightArrow()}</View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  timerWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  textInputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userListWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  middle: {
    flex: 5,
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
  buttonText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userName: {
    marginBottom: 10,
    fontFamily: 'CircularStd-Medium',
    fontSize: 20,
    alignSelf: 'center',
  },
  userUsername: {
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default function RankScreen(props) {
  const theme = useTheme();

  return <Rank {...props} theme={theme} />;
}
