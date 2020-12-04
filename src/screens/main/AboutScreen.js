import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';

function AboutScreen() {
  const {colors} = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.centerText, {backgroundColor: colors.background}]}>
        <Text style={[styles.about, {color: colors.text}]}>Made with ❤ by</Text>
        <Text style={[styles.about, {color: colors.text}]}>cliid & Shio.</Text>
      </View>
      <View
        style={[
          styles.jitcijkProductText,
          {backgroundColor: colors.background},
        ]}>
        <Text style={[styles.about, {color: colors.text}]}>
          A product of Jitcijk Inc.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jitcijkProductText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  about: {
    fontSize: 20,
    fontFamily: 'CircularStd-Medium',
    textAlign: 'center',
    margin: 10,
  },
});

export default AboutScreen;
