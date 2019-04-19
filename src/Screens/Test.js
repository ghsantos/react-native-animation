/* @flow weak */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={{ color: '#fff' }}>{text}</Text>
  </TouchableOpacity>
);

const Test = () => {
  const [num, setNum] = useState(0);

  return (
    <View style={styles.container}>
      <Button onPress={() => setNum(num - 1)} text="-" />

      <Text style={{ padding: 10, fontSize: 20 }}>{num}</Text>

      <Button onPress={() => setNum(num + 1)} text="+" />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
