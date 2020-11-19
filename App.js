import {Scene, Router} from 'react-native-router-flux';
import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider, useTheme} from './components/theme/ThemeContext';
import CalculatorView from './components/CalculatorView';
import TimeView from './components/TimeView';
import MusicView from './components/MusicView';
import StopwatchView from './components/StopwatchView';

const App = () => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scene: {
      backgroundColor: colors.background,
    },
  });
  return (
    <AppearanceProvider hideNavBar={true}>
      <ThemeProvider hideNavBar={true}>
        <Router>
          <SafeAreaView>
            <Scene key="root" hideNavBar>
              <Scene key="time" component={TimeView} initial />
              <Scene key="calculator" component={CalculatorView} />
              <Scene key="stopwatch" component={StopwatchView} />
              <Scene key="music" component={MusicView} />
            </Scene>
          </SafeAreaView>
        </Router>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
