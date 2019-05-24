/* @flow weak */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const notFound = require('./carnotfound.jpg');

const Card = ({ model, photo }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <FastImage
        style={{ width: '100%', height: 240 }}
        source={{ uri: photo, priority: FastImage.priority.normal }}
        resizeMode={FastImage.resizeMode.cover}
        onError={() => console.log('error', model)}
        onLoad={() => {
          console.log('load', model);
          setLoaded(true);
        }}
      />

      {!loaded && (
        <FastImage
          style={{ width: '100%', height: 240, position: 'absolute' }}
          source={notFound}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      <Text style={styles.model}>{model}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    elevation: 2,
    marginBottom: 15,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  model: {
    fontSize: 18,
    color: '#111111',
    padding: 10,
  },
});
