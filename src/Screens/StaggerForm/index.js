/* @flow weak */

import React, { Component } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const background = require('./background.jpg');

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const createAnimationStyle = animation => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animation,
    transform: [{ translateY }],
  };
};

export default class StaggerForm extends Component {
  state = {
    email: new Animated.Value(0),
    password: new Animated.Value(0),
    button: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.stagger(200, [
      Animated.timing(this.state.email, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.password, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.button, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const emailStyle = createAnimationStyle(this.state.email);
    const passwordStyle = createAnimationStyle(this.state.password);
    const buttonStyle = createAnimationStyle(this.state.button);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: null, height: null }]}
        >
          <View style={{ flex: 1 }} />

          <View style={styles.form}>
            <Text style={styles.title}>Login</Text>

            <AnimatedTextInput
              style={[styles.input, emailStyle]}
              placeholder="email"
              keyboardType="email-address"
            />
            <AnimatedTextInput
              style={[styles.input, passwordStyle]}
              placeholder="Password"
              secureTextEntry
            />

            <TouchableOpacity>
              <Animated.View style={[styles.button, buttonStyle]}>
                <Text style={styles.buttonText}>Login</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});
