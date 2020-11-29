import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

class NoteClass extends Component {
  render() {
    return (
      <View
        key={this.props.keyVal}
        style={[
          styles.note,
          {borderBottomColor: this.props.theme.colors.disabled},
        ]}>
        <Text style={[styles.noteText, {color: this.props.theme.colors.text}]}>
          {this.props.note.date}
        </Text>
        <Text style={[styles.noteText, {color: this.props.theme.colors.text}]}>
          {this.props.note.note}
        </Text>

        <TouchableOpacity
          style={styles.deleteNote}
          onPress={this.props.deleteMethod}>
          <Text
            style={[
              styles.deleteNoteText,
              {color: this.props.theme.colors.accent},
            ]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
  },
  noteText: {
    paddingLeft: 20,
    margin: 10,
    fontFamily: 'CircularStd-Medium',
  },
  deleteNote: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  deleteNoteText: {
    fontFamily: 'CircularStd-Medium',
  },
});

export default function Note(props) {
  const theme = useTheme();

  return <NoteClass {...props} theme={theme} />;
}
