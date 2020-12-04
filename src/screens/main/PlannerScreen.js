import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import Note from '../../components/Note';

class Planner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      noteText: '',
    };
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote() {
    if (this.state.noteText) {
      let date = new Date();
      this.state.notes.push({
        date:
          date.getDate() +
          '/' +
          (date.getMonth() + 1 + '/' + date.getFullYear()),
        note: this.state.noteText,
      });
      this.setState({notes: this.state.notes});
      this.setState({noteText: ''});
    }
  }
  deleteNote(key) {
    this.state.notes.splice(key, 1);
    this.setState({notes: this.state.notes});
  }

  render() {
    let notes = this.state.notes.map((note, key) => {
      return (
        <Note
          key={key}
          keyVal={key}
          note={note}
          deleteMethod={() => this.deleteNote(key)}
        />
      );
    });

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[styles.header, {borderColor: this.props.theme.colors.text}]}>
          <Text
            style={[
              styles.headerText,
              {
                borderBottomColor: this.props.theme.colors.disabled,
                color: this.props.theme.colors.text,
              },
            ]}>
            Planner
          </Text>
        </View>

        <ScrollView>{notes}</ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: this.props.theme.colors.background,
                borderTopColor: this.props.theme.colors.disabled,
                color: this.props.theme.colors.text,
              },
            ]}
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder="Make a note"
            placeholderTextColor={this.props.theme.colors.disabled}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: this.props.theme.colors.text,
            },
          ]}
          onPress={this.addNote}>
          <Text
            style={[
              styles.addButtonText,
              {color: this.props.theme.colors.background},
            ]}>
            Add
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'CircularStd-Medium',
    padding: 26,
  },

  textInput: {
    alignSelf: 'stretch',
    padding: 20,
    borderTopWidth: 2,
    fontFamily: 'CircularStd-Medium',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 18,
  },
});

export default function PlannerScreen(props) {
  const theme = useTheme();

  return <Planner {...props} theme={theme} />;
}
