/* @flow weak */

import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const Button = ({ color }) => (
  <View style={styles.container}>
    <Animated.View style={[styles.horizontal, { backgroundColor: color }]} />
    <Animated.View style={[styles.vertical, { backgroundColor: color }]} />
  </View>
);

export default Button;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  vertical: {
    width: 2,
    height: 17,
    position: 'absolute',
  },
  horizontal: {
    width: 17,
    height: 2,
    position: 'absolute',
  },
});
