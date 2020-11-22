import React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ClockScreen from './src/screens/ClockScreen';
import MusicScreen from './src/screens/MusicScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';
import StopwatchScreen from './src/screens/StopwatchScreen';
import TimerScreen from './src/screens/TimerScreen';
import {DrawerContent} from './src/DrawerContent';
import {Context} from './src/components/Context';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const LyferDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#000000',
    },
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
          </Drawer.Navigator>
        </NavigationContainer>
      </Context.Provider>
    </PaperProvider>
  );
};

export default App;
