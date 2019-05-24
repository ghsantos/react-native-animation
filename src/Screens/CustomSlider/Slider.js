import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import Cursor from './Cursor';
import Labels from './Labels';

const { Value, add, max } = Animated;

const { width: totalWidth } = Dimensions.get('window');
const count = 5;
const width = totalWidth / count;
const height = width;

const Slider = () => {
  const x = new Value(0);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#D55D70',
          width: add(max(x, 0), height),
          height,
          borderRadius: height / 2,
        }}
      />
      <Labels size={height} x={x} count={count} />
      <Cursor size={height} x={x} count={count} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height,
    borderRadius: height / 2,
    backgroundColor: '#f1f2f6',
  },
});
