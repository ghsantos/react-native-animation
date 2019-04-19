/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

export default class Corners extends Component {
  state = {
    animation: new Animated.ValueXY(),
  };

  startAnimation = () => {
    const { width, height } = Dimensions.get('window');

    Animated.sequence([
      Animated.spring(this.state.animation.y, {
        toValue: height - this._height,
      }),
      Animated.spring(this.state.animation.x, {
        toValue: width - this._width,
      }),
      Animated.spring(this.state.animation.y, {
        toValue: 0,
      }),
      Animated.spring(this.state.animation.x, {
        toValue: 0,
      }),
    ]).start();
  };

  saveDimensions = e => {
    this._width = e.nativeEvent.layout.width;
    this._height = e.nativeEvent.layout.height;
  };

  render() {
    const animatedStyles = {
      transform: this.state.animation.getTranslateTransform(),
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={this.startAnimation}
          onLayout={this.saveDimensions}
        >
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
