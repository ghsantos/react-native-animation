/* @flow weak */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import Slider from './Slider';

const CustomSlider = () => (
  <View style={styles.container}>
    <Slider />
  </View>
);

export default CustomSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
