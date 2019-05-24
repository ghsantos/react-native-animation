/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';

const { round, add, divide, concat } = Animated;

const Cursor = ({ size, x, count }) => {
  const index = round(divide(x, size));
  console.log(index);

  return (
    <Animated.View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Animated.Text style={styles.text}>
        {`${1}`}
      </Animated.Text>
    </Animated.View>
  );
};

export default Cursor;

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#222',
    fontSize: 24,
  },
});
