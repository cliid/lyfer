import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import CalcBtn from '../../components/Button';
import {useTheme} from 'react-native-paper';

class Calculator extends Component {
  state = {
    value: null,
    displayValue: '0',
    waitingForOperand: false,
    operator: null,
    bts: ' ',
  };

  inputDigit = (digit) => {
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDot = () => {
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false,
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      bts: ' ',
    });
  };

  toggleSign = () => {
    const {displayValue} = this.state;

    this.setState({
      displayValue:
        displayValue.charAt(0) === '-'
          ? displayValue.substr(1)
          : '-' + displayValue,
    });
  };

  inputPercent = () => {
    const {displayValue} = this.state;
    const value = parseFloat(displayValue);
    this.setState({
      displayValue: String(value / 100),
    });
  };

  performOperation = (nextOperator) => {
    const {displayValue, operator, value} = this.state;

    const nextValue = parseFloat(displayValue);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      x: (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue,
    };

    if (value == null) {
      this.setState({
        value: nextValue,
      });
    } else if (operator) {
      const currentValue = value || 0;
      const computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue),
        bts:
          operator === '=' ? ' ' : `${currentValue} ${operator} ${nextValue}`,
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  render() {
    const {displayValue} = this.state;
    const {theme} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.top, {borderBottomColor: theme.colors.text}]}>
          <Text style={[styles.number, {color: theme.colors.text}]}>
            {this.state.bts}
          </Text>
          <Text style={[styles.bigNumber, {color: theme.colors.text}]}>
            {displayValue}
          </Text>
        </View>
        <View style={styles.row}>
          <CalcBtn
            text="AC"
            colors={theme.colors}
            onPress={this.clearDisplay}
          />
          <CalcBtn text="±" colors={theme.colors} onPress={this.toggleSign} />
          <CalcBtn text="%" colors={theme.colors} onPress={this.inputPercent} />
          <CalcBtn
            text="/"
            colors={theme.colors}
            onPress={() => this.performOperation('/')}
          />
        </View>

        <View style={styles.row}>
          <CalcBtn
            text="7"
            onPress={() => this.inputDigit(7)}
            colors={theme.colors}
          />
          <CalcBtn
            text="8"
            onPress={() => this.inputDigit(8)}
            colors={theme.colors}
          />
          <CalcBtn
            text="9"
            onPress={() => this.inputDigit(9)}
            colors={theme.colors}
          />
          <CalcBtn
            text="x"
            colors={theme.colors}
            onPress={() => this.performOperation('x')}
          />
        </View>
        <View style={styles.row}>
          <CalcBtn
            text="4"
            onPress={() => this.inputDigit(4)}
            colors={theme.colors}
          />
          <CalcBtn
            text="5"
            onPress={() => this.inputDigit(5)}
            colors={theme.colors}
          />
          <CalcBtn
            text="6"
            onPress={() => this.inputDigit(6)}
            colors={theme.colors}
          />
          <CalcBtn
            text="-"
            colors={theme.colors}
            onPress={() => this.performOperation('-')}
          />
        </View>
        <View style={styles.row}>
          <CalcBtn
            text="1"
            onPress={() => this.inputDigit(1)}
            colors={theme.colors}
          />
          <CalcBtn
            text="2"
            onPress={() => this.inputDigit(2)}
            colors={theme.colors}
          />
          <CalcBtn
            text="3"
            onPress={() => this.inputDigit(3)}
            colors={theme.colors}
          />
          <CalcBtn
            text="+"
            colors={theme.colors}
            onPress={() => this.performOperation('+')}
          />
        </View>

        <View style={styles.row}>
          <CalcBtn
            text="0"
            colors={theme.colors}
            onPress={() => this.inputDigit(0)}
            isZero
          />

          <CalcBtn text="." colors={theme.colors} onPress={this.inputDot} />
          <CalcBtn
            text="="
            colors={theme.colors}
            onPress={() => this.performOperation('=')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 50,
    borderBottomWidth: 2,
  },
  bottom: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigNumber: {
    textAlign: 'right',
    padding: 10,
    fontSize: 45,
    fontFamily: 'CircularStd-Book',
  },
  number: {
    textAlign: 'right',
    padding: 10,
    fontSize: 25,
    fontFamily: 'CircularStd-Book',
  },
});

export default function CalculatorScreen(props) {
  const theme = useTheme();

  return <Calculator {...props} theme={theme} />;
}
