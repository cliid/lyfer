import React, {useEffect, useState} from 'react';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  configureFonts,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {Context} from './src/components/Context';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'CircularStd-Medium',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'CircularStd-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'CircularStd-Medium',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'CircularStd-Medium',
        fontWeight: 'normal',
      },
    },
  };

  const LyferDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#000000',
    },
    fonts: configureFonts(fontConfig),
  };

  const LyferDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#000000',
      text: '#ffffff',
    },
    fonts: configureFonts(fontConfig),
  };
  const theme = isDarkTheme ? LyferDarkTheme : LyferDefaultTheme;

  const context = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  return (
    <PaperProvider theme={theme}>
      <Context.Provider value={context}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    </PaperProvider>
  );
};

export default App;
