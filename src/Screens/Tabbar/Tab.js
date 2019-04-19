/* @flow weak */

import React, { PureComponent } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';

import StaticTabBar, { tabHeight as height } from './StaticTabBar';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width } = Dimensions.get('window');

const tabs = [
  {
    name: 'grid',
  },
  {
    name: 'list',
  },
  {
    name: 'repeat',
  },
  {
    name: 'map',
  },
  {
    name: 'user',
  },
];

const tabWidth = width / tabs.length;
const backgroundColor = 'white';

const getPath = () => {
  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([{ x: 0, y: 0 }, { x: width, y: 0 }]);

  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    { x: width, y: 0 },
    { x: width + 4 + 4, y: 0 },
    { x: width + 10 + 2, y: 10 },
    { x: width + 16, y: height - 5 },
    { x: width + tabWidth - 16, y: height - 5 },
    { x: width + tabWidth - 10, y: 10 },
    { x: width + tabWidth - 4, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);
  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    { x: width + tabWidth, y: 0 },
    { x: width * 2, y: 0 },
    { x: width * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();

export default class Tab extends PureComponent {
  value = new Animated.Value(0);

  render() {
    const { value } = this;

    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0],
    });

    const animatedStyles = {
      transform: [{ translateX }],
    };

    return (
      <>
        <View {...{ width, height }}>
          <AnimatedSvg width={width * 2} {...{ height }} style={animatedStyles}>
            <Path fill={backgroundColor} {...{ d }} />
          </AnimatedSvg>

          <View style={StyleSheet.absoluteFill}>
            <StaticTabBar tabs={tabs} value={value} />
          </View>
        </View>

        <SafeAreaView style={styles.safeArea} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
});
