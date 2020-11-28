import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

import Slide from '../util/AboutSlide';

function AboutScreen() {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          <Slide label="cliid" right={true} />
          <Slide label="Shio" right={true} />
        </ScrollView>
      </View>
      <View style={styles.footer} />
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: 0.61 * height,
  },
  footer: {
    flex: 1,
  },
});

export default AboutScreen;
