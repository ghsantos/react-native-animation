/* @flow weak */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { atan2 } from './Math';

const { Code, block, cond, eq, set, add, sub, multiply, cos, sin } = Animated;

const Cursor = ({ radius, angle, start }) => {
  const alpha = new Animated.Value(0);
  const x = new Animated.Value(0);
  const y = new Animated.Value(0);
  const offsetX = new Animated.Value(0);
  const offsetY = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const translationX = new Animated.Value(0);
  const translationY = new Animated.Value(0);
  const state = new Animated.Value(State.UNDETERMINED);

  const onGestureEvent = Animated.event([
    { nativeEvent: { translationX, translationY, state } },
  ]);

  return (
    <>
      <Code>
        {() =>
          block([
            cond(eq(state, State.ACTIVE), [
              set(x, add(offsetX, translationX)),
              set(y, add(offsetY, translationY)),
            ]),
            cond(eq(state, State.END), [set(offsetX, x), set(offsetY, y)]),
            set(alpha, atan2(sub(multiply(y, -1), radius), sub(x, radius))),
            set(angle, alpha),
            set(translateX, add(multiply(radius, cos(alpha)), radius)),
            set(translateY, add(multiply(-1 * radius, sin(alpha)), radius)),
          ])
        }
      </Code>

      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateX, translateY }],
              backgroundColor: start ? '#FF8C0F' : '#FFC20F',
            },
          ]}
        >
          <View style={styles.content}>
            <Icon
              name={start ? 'ios-cloudy-night' : 'ios-notifications'}
              size={28}
              color={start ? '#FF8C0F' : '#FFC20F'}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Cursor;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#292729',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
