import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';

import ClockScreen from './ClockScreen';
import TimerScreen from './TimerScreen';
import StopwatchScreen from './StopwatchScreen';

const Tab = createMaterialBottomTabNavigator();

function TimeScreen() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Clock"
      backBehavior="none"
      labeled={true}
      barStyle={{backgroundColor: colors.background}}>
      <Tab.Screen
        name="Clock"
        component={ClockScreen}
        options={{tabBarIcon: 'web-clock'}}
      />
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{tabBarIcon: 'av-timer'}}
      />
      <Tab.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{tabBarIcon: 'timer-outline'}}
      />
    </Tab.Navigator>
  );
}
export default TimeScreen;
