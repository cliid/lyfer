import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';

import WorldClockScreen from './WorldClockScreen';
import TimerScreen from './TimerScreen';
import StopwatchScreen from './StopwatchScreen';

const Tab = createMaterialBottomTabNavigator();

function ClockScreen() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="World Clock"
      backBehavior="none"
      shifting={true}
      sceneAnimationEnabled={false}
      labeled={true}
      barStyle={{backgroundColor: colors.background}}>
      <Tab.Screen
        name="World Clock"
        component={WorldClockScreen}
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
export default ClockScreen;
