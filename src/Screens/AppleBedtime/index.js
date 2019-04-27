/* @flow weak */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Slider from './Slider';

export default class AppleBadtime extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Slider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121012',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
