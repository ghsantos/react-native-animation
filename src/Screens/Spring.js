/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export default class Spring extends Component {
  state = {
    animation: new Animated.Value(1),
  };

  startAnimation = () => {
    Animated.spring(this.state.animation, {
      toValue: 2,
      friction: 15,
      tension: 140,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 100,
      }).start();
    });
  };

  render() {
    const animatedStyles = {
      transform: [{ scale: this.state.animation }],
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
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
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'tomato',
  },
});
