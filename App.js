import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
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
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Context} from './src/components/Context';
import ClockScreen from './src/screens/ClockScreen';
import MusicScreen from './src/screens/MusicScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';
import StopwatchScreen from './src/screens/StopwatchScreen';
import TimerScreen from './src/screens/TimerScreen';
import {DrawerContent} from './src/DrawerContent';
import PlannerScreen from './src/screens/PlannerScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: false, duration: 1000}); // fade
  }, []);

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
          <Drawer.Navigator
            initialRouteName="Clock"
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Clock" component={ClockScreen} />
            <Drawer.Screen name="Timer" component={TimerScreen} />
            <Drawer.Screen name="Stopwatch" component={StopwatchScreen} />
            <Drawer.Screen name="Music" component={MusicScreen} />
            <Drawer.Screen name="Calculator" component={CalculatorScreen} />
            <Drawer.Screen name="Planner" component={PlannerScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Context.Provider>
    </PaperProvider>
  );
};

export default App;
