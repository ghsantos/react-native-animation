/* @flow weak */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated from 'react-native-reanimated';

const {
  cond,
  add,
  multiply,
  divide,
  round,
  lessOrEq,
  interpolate,
  color,
} = Animated;

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const Labels = ({ size, x, count }) => {
  const index = add(round(divide(x, size)), 1);

  return (
    <View style={styles.container}>
      {new Array(count).fill(0).map((e, i) => {
        const textColor = interpolate(cond(lessOrEq(index, i), 0, 1), {
          inputRange: [0, 1],
          outputRange: [color(102, 102, 102), color(255, 255, 255)],
          estrapolate: 'clamp',
        });

        return (
          <Touchable
            key={i}
            onPress={() => x.setValue(multiply(i, size))}
            background={TouchableNativeFeedback.Ripple('', true)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Animated.Text
                style={{ color: textColor, textAlign: 'center', fontSize: 24 }}
              >
                {`${i + 1}`}
              </Animated.Text>
            </View>
          </Touchable>
        );
      })}
    </View>
  );
};

export default Labels;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
});
