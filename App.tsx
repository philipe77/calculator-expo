import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "./src/components/Button";
import { Display } from "./src/components/Display";

export interface CalculatorState {
  displayValue: string;
  clearDisplay: boolean;
  operation: string;
  values: Array<number>;
  current: number;
}

const initialState: CalculatorState = {
  displayValue: "0",
  clearDisplay: false,
  operation: "",
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {
    ...initialState,
  };

  addValue = (n: string) => {
    const clearDisplay: boolean =
      this.state.displayValue === "0" || this.state.clearDisplay;

    if (
      n === "." &&
      !clearDisplay && 
      this.state.displayValue.includes(".")
    ) {
      return;
    }

    //verifica se o valor inicial é zero ou o display foi zerado

    //valor atual
    const currentDisplay: string = clearDisplay ? "" : this.state.displayValue;

    //concatena valor atual com o valor digitado
    const displayValue = currentDisplay + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values: values });
    }
  };

  clearMemory = () => {
    return this.setState({ ...initialState });
  };

  setOperation = (operation: string) => {
    if (this.state.current === 0) {
      this.setState({ operation: operation, current: 1, clearDisplay: true });
    } else {
      const equals: boolean = operation === "=";
      const values = [...this.state.values];

      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      }catch(e){
        values[0] = this.state.values[0];
      }
      

      values[1] = 0;

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values: values,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" type="Triple" onClick={this.clearMemory} />
          <Button label="/" type="Operational" onClick={this.setOperation} />
          <Button label="7" onClick={this.addValue} />
          <Button label="8" onClick={this.addValue} />
          <Button label="9" onClick={this.addValue} />
          <Button label="*" type="Operational" onClick={this.setOperation} />
          <Button label="4" onClick={this.addValue} />
          <Button label="5" onClick={this.addValue} />
          <Button label="6" onClick={this.addValue} />
          <Button label="-" type="Operational" onClick={this.setOperation} />
          <Button label="1" onClick={this.addValue} />
          <Button label="2" onClick={this.addValue} />
          <Button label="3" onClick={this.addValue} />
          <Button label="+" type="Operational" onClick={this.setOperation} />
          <Button label="0" type="Double" onClick={this.addValue} />
          <Button label="." onClick={this.addValue} />
          <Button label="=" type="Operational" onClick={this.setOperation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
