import React, {Component} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from 'react-native-paper';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      page: 1,
      isListEnd: false,
      accessToken: null,
      refreshToken: null,
    };
  }

  async componentDidMount() {
    this.setState({
      accessToken: await AsyncStorage.getItem('access_token'),
      refreshToken: await AsyncStorage.getItem('refresh_token'),
    });
    this.getData();
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
      dataSource: [],
      page: 1,
      isListEnd: false,
      accessToken: null,
      refreshToken: null,
    });
  }

  getData() {
    if (!this.state.loading && !this.state.isListEnd) {
      this.setState({loading: true});
      // Service to get the data from the server to render
      fetch(
        'https://lyfer.jitcijk.org/v1/users?sortBy=name:asc&limit=20&page=' +
          this.state.page,
        {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.state.accessToken,
          },
        },
      )
        // Sending the current page get request
        .then((response) => {
          if (response.status !== 200) {
            this.refreshAccessToken();
            this.getData(this.state.page);
          }
          return response.json();
        })
        .then((responseJson) => {
          // Successful response from the API Call
          if (responseJson.results.length > 0) {
            this.setState({
              page: this.state.page + 1,
              dataSource: [...this.state.dataSource, ...responseJson.results],
              loading: false,
            });
          } else {
            this.setState({
              isListEnd: true,
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  refreshAccessToken() {
    fetch('https://lyfer.jitcijk.org/v1/auth/refresh-tokens', {
      method: 'POST',
      body: JSON.stringify({
        refreshToken: this.state.refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        AsyncStorage.setItem('access_token', responseJson.access.token);
        AsyncStorage.setItem('refresh_token', responseJson.refresh.token);
        this.setState({
          accessToken: responseJson.access.token,
          refreshToken: responseJson.refresh.token,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderFooter() {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {this.state.loading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  }

  ItemView({item}) {
    const {theme} = this.props;
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
  }

  ItemSeparatorView() {
    const {theme} = this.props;
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: theme.colors.disabled,
        }}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ItemSeparatorView.bind(this)}
          renderItem={this.ItemView.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.getData.bind(this)}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userName: {
    marginLeft: 30,
    fontFamily: 'CircularStd-Medium',
    fontSize: 20,
    alignSelf: 'center',
  },
  userUsername: {
    marginLeft: 10,
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default function RankScreen(props) {
  const theme = useTheme();

  return <Rank {...props} theme={theme} />;
}
