import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {randomNoRepeats} from '../../util/random';
import {getJoke} from '../../util/random-joke';
import Emoji from '../../components/Emoji';

function LuckyScreen() {
  const emoji = [
    ...'😁😆😂🤣😊🙃😉😍😘😚😋😝😜🤪🤨🧐🤓😎🤩🥳😏😒😭😤🤯😳🤔🙄🥴', // 36 emojis
  ];
  const {colors} = useTheme();
  const chooser = randomNoRepeats(emoji);
  const [currentJoke, setCurrentJoke] = useState({
    setup: 'Programming Jokes!',
    punchline: 'Yikes!',
  });
  const [twemoji, setTwemoji] = useState(<Emoji>🤣</Emoji>);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.emojiWrapper}>{twemoji}</View>
      <View style={styles.setupWrapper}>
        <Text style={[styles.setup, {color: colors.text}]}>
          {'"' + currentJoke.setup + '"'}
        </Text>
      </View>
      <View style={styles.punchlineWrapper}>
        <Text style={[styles.punchline, {color: colors.text}]}>
          {'"' + currentJoke.punchline + '"'}
        </Text>
      </View>
      <View style={styles.nextJokeButtonWrapper}>
        <TouchableHighlight
          onPress={() => {
            getJoke().then((joke) => {
              setTwemoji(<Emoji>{chooser()}</Emoji>);
              setCurrentJoke(joke);
            });
          }}
          style={[
            styles.nextJokeButton,
            {
              backgroundColor: colors.text,
              underlayColor: colors.disabled,
              shadowColor: colors.text,
            },
          ]}>
          <Text style={[styles.nextJokeButtonText, {color: colors.background}]}>
            Next joke!
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setup: {
    fontSize: 19,
    fontFamily: 'CircularStd-Medium',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  punchline: {
    fontSize: 25,
    fontFamily: 'CircularStd-Medium',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },

  nextJokeButtonText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },

  setupWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  punchlineWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  emojiWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  nextJokeButton: {
    height: 80,
    width: 180,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  nextJokeButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
});

export default LuckyScreen;
