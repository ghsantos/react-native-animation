/* @flow weak */

import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated from 'react-native-reanimated';

import Cursor from './Cursor';
import Markers from './Markers';

const { add, sub, multiply, concat, cond, lessThan } = Animated;

const { width } = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Slider = () => {
  const start = new Animated.Value(0);
  const end = new Animated.Value(0);
  const delta = sub(
    cond(lessThan(start, end), end, add(end, Math.PI * 2)),
    start
  );
  const circumference = radius * Math.PI * 2;
  const strokeDashoffset = multiply(delta, radius);
  const rotateZ = concat(sub(Math.PI * 2, start), 'rad');

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ ...StyleSheet.absoluteFill, transform: [{ rotateZ }] }}
      >
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0" stopColor="#FFC20F" />
              <Stop offset="1" stopColor="#FF8C0F" />
            </LinearGradient>
          </Defs>
          <AnimatedCircle
            strokeWidth={strokeWidth}
            stroke="#292729"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          <AnimatedCircle
            stroke="url(#grad)"
            fill="none"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeWidth={strokeWidth}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
      </Animated.View>

      <Svg
        width={size - strokeWidth * 2}
        height={size - strokeWidth * 2}
        viewBox="0 0 88 88"
      >
        <Markers />
      </Svg>
      <Cursor radius={radius} angle={end} start={false} />
      <Cursor radius={radius} angle={start} start />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
