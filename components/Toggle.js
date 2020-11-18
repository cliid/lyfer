import * as React from 'react';
import {Switch} from 'react-native';
import {useTheme} from './theme/ThemeContext';

export const Toggle = () => {
  // We're also pulling setScheme here!
  const {setScheme, isDark} = useTheme();

  const toggleScheme = () => {
    /*
     * setScheme will change the state of the context
     * thus will cause the children inside the context provider to re-render
     * with the new color scheme
     */
    isDark ? setScheme('light') : setScheme('dark');
  };

  return <Switch value={isDark} onValueChange={toggleScheme} />;
};
