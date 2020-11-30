import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';

const Stack = createStackNavigator();

const Auth = ({navigation}) => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#000000', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontFamily: 'CircularStd-Medium',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
