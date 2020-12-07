import React, {Component} from 'react';
import {SvgUri} from 'react-native-svg';
import emojiUnicode from 'emoji-unicode';

export default class Emoji extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgUri
        width="50%"
        height="50%"
        uri={
          'https://raw.githubusercontent.com/twitter/twemoji/8017ebd412a6293993aa5c0709f0e035714b3cdd/assets/svg/' +
          emojiUnicode(this.props.children.trim().replace(/\s+/g, '-')) +
          '.svg'
        }
      />
    );
  }
}
