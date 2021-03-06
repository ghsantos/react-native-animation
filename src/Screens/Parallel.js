/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

export default class Parallel extends Component {
  state = {
    colorAnimation: new Animated.Value(0),
    scaleAnimation: new Animated.Value(1),
  };

  handlePress = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.colorAnimation, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.state.scaleAnimation, {
          toValue: 2,
          duration: 300,
        }),
      ]),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(this.state.colorAnimation, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(this.state.scaleAnimation, {
          toValue: 1,
          duration: 500,
        }),
      ]),
    ]).start();
  };

  render() {
    const backgroundColorInterpolate = this.state.colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(255,99,71)', 'rgb(99,71,255)'],
    });

    const boxStyle = {
      backgroundColor: backgroundColorInterpolate,
      transform: [{ scale: this.state.scaleAnimation }],
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Animated.View style={[styles.box, boxStyle]}>
            <Text style={styles.text}>Hello Parallel</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
