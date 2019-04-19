/* @flow weak */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Tab from './Tab';

export default class Tabbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ea3345',
    justifyContent: 'flex-end',
  },
});
