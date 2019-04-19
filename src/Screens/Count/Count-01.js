/**
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setNum(num + 1), 1000);

    return () => clearInterval(interval);
  }, [num]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => setCount(count - 1)}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>-</Text>
        </TouchableOpacity>

        <Text style={styles.welcome}>{count}</Text>

        <TouchableOpacity
          onPress={() => setCount(count + 1)}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>+</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.welcome}>{num}</Text>
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
