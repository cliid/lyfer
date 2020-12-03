import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class VirtualKeyboard extends Component {
  static propTypes = {
    pressMode: PropTypes.oneOf(['string', 'char']),
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    applyBackspaceTint: PropTypes.bool,
    decimal: PropTypes.bool,
    rowStyle: ViewPropTypes.style,
    cellStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    pressMode: 'string',
    color: 'gray',
    applyBackspaceTint: true,
    decimal: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.Row([1, 2, 3])}
        {this.Row([4, 5, 6])}
        {this.Row([7, 8, 9])}
        <View style={[styles.row, this.props.rowStyle]}>
          {this.props.decimal ? this.Cell('.') : <View style={{flex: 1}} />}
          {this.Cell(0)}
          {this.Backspace()}
        </View>
      </View>
    );
  }

  Backspace() {
    return (
      <TouchableOpacity
        accessibilityLabel="backspace"
        style={styles.backspace}
        onPress={() => {
          this.onPress('back');
        }}
        onLongPress={() => {
          this.setState({text: ''});
        }}>
        <MaterialCommunityIcons
          name="backspace-outline"
          color={this.props.color}
          size={25}
        />
      </TouchableOpacity>
    );
  }

  Row(numbersArray) {
    let cells = numbersArray.map((val) => this.Cell(val));
    return <View style={[styles.row, this.props.rowStyle]}>{cells}</View>;
  }

  Cell(symbol) {
    return (
      <TouchableOpacity
        style={[styles.cell, this.props.cellStyle]}
        key={symbol}
        accessibilityLabel={symbol.toString()}
        onPress={() => {
          this.onPress(symbol.toString());
        }}>
        <Text style={[styles.number, {color: this.props.color}]}>{symbol}</Text>
      </TouchableOpacity>
    );
  }

  onPress(val) {
    if (this.props.pressMode === 'string') {
      let curText = this.state.text;
      if (isNaN(val)) {
        if (val === 'back') {
          curText = curText.slice(0, -1);
        } else {
          curText += val;
        }
      } else {
        curText += val;
      }
      this.setState({text: curText});
      this.props.onPress(curText);
    } /* if (props.pressMode == 'char')*/ else {
      this.props.onPress(val);
    }
  }
}

export default VirtualKeyboard;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  number: {
    fontSize: 25,
    textAlign: 'center',
  },
  backspace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
});
