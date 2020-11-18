import {Scene, Router} from 'react-native-router-flux';
import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider, useTheme} from './components/theme/ThemeContext';
import CalculatorView from './components/CalculatorView';
import TimeView from './components/TimeView';
import TimerView from './components/TimerView';
import MusicView from './components/MusicView';

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
      shadowOpacity: 1,
      shadowRadius: 3,
    },
  });
  return (
    <AppearanceProvider hideNavBar={true}>
      <ThemeProvider hideNavBar={true}>
        <Router sceneStyle={styles.scene}>
          <SafeAreaView>
            <Scene key="root" titleStyle={{alignSelf: 'center'}} hideNavBar>
              <Scene key="time" component={TimeView} initial={true} />
              <Scene key="calculator" component={CalculatorView} />
              <Scene key="timer" component={TimerView} />
              <Scene key="music" component={MusicView} />
            </Scene>
          </SafeAreaView>
        </Router>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
