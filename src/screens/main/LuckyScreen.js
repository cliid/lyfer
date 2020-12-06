import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {randomNoRepeats} from '../../util/random';
import {getJoke} from '../../util/random-joke';

function LuckyScreen() {
  const emoji = [
    ...'😀😃😁😆😂🤣☺😊🙂🙃😉😍😘😚😋😝😜🤪🤨🧐🤓😎🤩🥳😏😒😭😤🤯😳🤗🤔😬🙄🥴🤒', // 37 emojis
  ];
  const {colors} = useTheme();
  const chooser = randomNoRepeats(emoji);
  const [currentEmoji, setCurrentEmoji] = useState(chooser());
  const [currentJoke, setCurrentJoke] = useState({setup: '', punchline: ''});
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.emojiWrapper}>
        <Text style={[styles.emoji, {color: colors.text}]}>{currentEmoji}</Text>
      </View>
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
        <TouchableOpacity
          onPress={() => {
            setCurrentEmoji(chooser());
            getJoke().then((joke) => setCurrentJoke(joke));
          }}>
          <Text style={styles.nextJokeButton}>Next joke!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setup: {
    fontSize: 20,
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
  emoji: {
    fontSize: 40,
    fontFamily: 'CircularStd-Medium',
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
    fontSize: 30,
    fontFamily: 'CircularStd-Medium',
  },
  nextJokeButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
});

export default LuckyScreen;
