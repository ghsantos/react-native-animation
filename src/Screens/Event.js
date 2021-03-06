/* @flow */

import React, { Component } from 'react';
import { Animated, View, ScrollView, StyleSheet } from 'react-native';

export default class Event extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  render() {
    const backgroundInterpolate = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ['rgb(255,99,71)', 'rgb(99,72,255)'],
    });

    const backgroundStyle = {
      backgroundColor: backgroundInterpolate,
    };

    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          // onScroll={e => this.state.animation.setValue(e.nativeEvent.contentOffset.y)}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: {
                y: this.state.animation,
              }
            }
          }])}
        >
          <Animated.View style={[styles.content, backgroundStyle]} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 3000,
  },
});
