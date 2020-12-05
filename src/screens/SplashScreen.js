import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import AsyncStorage from '@react-native-community/async-storage';
import {startTracking} from '../util/tracking';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const init = async () => {
      AsyncStorage.getItem('access_token').then((value) => {
        if (value === null) {
          navigation.replace('Auth');
          return;
        }
        navigation.replace('Main');
      });
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, [navigation]);
  return null;
};

export default SplashScreen;
