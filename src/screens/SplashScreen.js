import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const init = async () => {
      AsyncStorage.getItem('access_token').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'Main'),
      );
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, [navigation]);
  return null;
};

export default SplashScreen;
