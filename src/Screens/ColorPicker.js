/* @flow weak */

import React, { Component } from 'react';
import {
  Animated,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class ColorPicker extends Component {
  state = {
    buttonAnimation: new Animated.Value(0),
    animation: new Animated.Value(0),
    color: '#000',
    inputOpen: false,
  };

  _open = false;
  _inputOpen = false;

  handleToggle = () => {
    const toValue = this._open ? 0 : 1;

    Animated.spring(this.state.animation, {
      toValue,
      useNativeDriver: true,
    }).start();

    this._open = !this._open;
  };

  toggleInput = () => {
    const toValue = this._inputOpen ? 0 : 1;

    Animated.timing(this.state.buttonAnimation, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();

    this._inputOpen = !this._inputOpen;

    this.setState({ inputOpen: this._inputOpen }, () => {
      !this.state.inputOpen
        ? this._input.getNode().blur()
        : this._input.getNode().focus();
    });
  };

  render() {
    const scaleXinterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.2, 1],
    });

    const translateYInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    const rowStyle = {
      opacity: this.state.animation,
      transform: [
        { translateY: translateYInterpolate },
        { scaleX: scaleXinterpolate },
        { scaleY: this.state.animation },
      ],
    };

    const moveInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    const buttonStyle = {
      transform: [
        { translateX: moveInterpolate },
        { scale: this.state.buttonAnimation },
      ],
      opacity: this.state.buttonAnimation,
    };

    console.log(buttonStyle);

    const iconTraslate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

    const opacityIconInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.2],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const iconStyle = {
      opacity: opacityIconInterpolate,
      transform: [{ translateX: iconTraslate }],
    };

    const inputOpacityInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });

    const inputStyle = {
      opacity: inputOpacityInterpolate,
    };

    const colorStyle = {
      backgroundColor: this.state.color,
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.rowWrap, rowStyle]}>
          <TouchableWithoutFeedback onPress={this.toggleInput}>
            <Animated.View style={[styles.colorBall, colorStyle]} />
          </TouchableWithoutFeedback>

          <View style={styles.row}>
            <TouchableOpacity>
              <AnimatedIcon
                name="bold"
                size={30}
                color="#555"
                style={iconStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon
                name="italic"
                size={30}
                color="#555"
                style={iconStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon
                name="align-center"
                size={30}
                color="#555"
                style={iconStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon
                name="link"
                size={30}
                color="#555"
                style={iconStyle}
              />
            </TouchableOpacity>

            <Animated.View
              style={[StyleSheet.absoluteFill, styles.colorRowWrap]}
              pointerEvents={this.state.inputOpen ? 'auto' : 'none'}
            >
              <AnimatedTextInput
                style={[styles.input, inputStyle]}
                value={this.state.color}
                onChangeText={color => this.setState({ color })}
                ref={input => {
                  this._input = input;
                }}
              />

              <TouchableWithoutFeedback onPress={this.toggleInput}>
                <Animated.View style={[styles.okayButton, buttonStyle]}>
                  <Text style={styles.okayText}>OK</Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </Animated.View>

        <TouchableOpacity onPress={this.handleToggle} style={styles.button}>
          <Text>Toggle open/close</Text>
        </TouchableOpacity>
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
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '50%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 4,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  colorRowWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    padding: 0,
  },
  okayButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#309EEB',
  },
  okayText: {
    color: '#fff',
  },
  button: {
    paddingTop: 50,
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
});
