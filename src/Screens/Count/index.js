/**
 * @format
 * @flow
 */

import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;

  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  }

  return state;
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: 'tick' }), 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'step', step: step - 1 })}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>-</Text>
        </TouchableOpacity>

        <Text style={styles.welcome}>{step}</Text>

        <TouchableOpacity
          onPress={() => dispatch({ type: 'step', step: step + 1 })}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>+</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.welcome}>{count}</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'tomato',
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff',
  },
});
