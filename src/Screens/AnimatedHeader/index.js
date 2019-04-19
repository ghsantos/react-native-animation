/* @flow weak */

import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const dog = require('./dog.png');

const items = [...Array(20).keys()];

const HeaderPlaceholder = (
  <View style={{ flex: 0, height: 140, width: '100%' }} />
);

export default class AnimatedHeader extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  _scrollView = null;

  onScrollEndSnapToEdge = event => {
    const y = event.nativeEvent.contentOffset.y;
    if (0 < y && y < 80 / 2) {
      if (this._scrollView) {
        this._scrollView.scrollTo({ y: 0 });
      }
    } else if (80 / 2 <= y && y < 80) {
      if (this._scrollView) {
        this._scrollView.scrollTo({ y: 80 });
      }
    }
  };

  render() {
    const translateY = this.state.animation.interpolate({
      inputRange: [0, 80],
      outputRange: [0, -80],
      extrapolate: 'clamp',
    });

    const headerStyle = {
      transform: [{ translateY }],
    };

    const textScale = this.state.animation.interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0.7],
      extrapolate: 'clamp',
    });

    const textTranslateY = this.state.animation.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 125],
      extrapolate: 'clamp',
    });

    const textAnimatedStyles = {
      transform: [{ scale: textScale }, { translateY: textTranslateY }],
    };

    const imageScale = this.state.animation.interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0.7],
      extrapolate: 'clamp',
    });

    const imageTranslateY = this.state.animation.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 20],
      extrapolate: 'clamp',
    });

    const imageStyles = {
      transform: [{ scale: imageScale }, { translateY: imageTranslateY }],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, headerStyle]}>
          <Animated.Text style={[styles.title, textAnimatedStyles]}>
            I'm Animated Header
          </Animated.Text>

          <Animated.Image source={dog} style={[styles.image, imageStyles]} />
        </Animated.View>

        <Animated.ScrollView
          ref={scrollView => {
            this._scrollView = scrollView ? scrollView._component : null;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.animation } } }],
            { useNativeDriver: true }
          )}
          onScrollEndDrag={this.onScrollEndSnapToEdge}
          onMomentumScrollEnd={this.onScrollEndSnapToEdge}
          // scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {HeaderPlaceholder}
          {items.map(item => (
            <View key={item} style={styles.item}>
              <Text style={styles.text}>Item {item}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    backgroundColor: '#aaa',
    elevation: 3,
    height: 140,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
  },
  item: {
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 2,
    elevation: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
  },
});
