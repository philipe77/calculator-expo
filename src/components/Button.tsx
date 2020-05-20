import React from "react";

import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  StyleProp,
  TextStyle,
} from "react-native";

export interface buttonOpt {
  label: string;
  type?: string;
  onClick?: any;
}

export function Button(props: buttonOpt) {
  const stylesButton: Array<StyleProp<TextStyle>> = [styles.button];
  if (props.type == "Double") stylesButton.push(styles.buttonDouble);
  if (props.type == "Triple") stylesButton.push(styles.buttonTriple);
  if (props.type == "Operational") stylesButton.push(styles.operationButton);

  return (
    <TouchableHighlight onPress={() =>props.onClick(props.label)}>
      <Text style={stylesButton}>{props.label}</Text>
    </TouchableHighlight>
  );
}

export const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    padding: 10,
    backgroundColor: "#fff",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#999",
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
  buttonDouble: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
});
