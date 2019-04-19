/* @flow weak */

import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export const cardWidth = width * 0.85;

const Card = ({ name, tasks }) => (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Text style={styles.tasks}>{tasks} Tasks</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  </View>
);

export default Card;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    margin: 5,
    borderRadius: 4,
    justifyContent: 'flex-end',
    elevation: 3,
  },
  tasks: {
    color: '#777',
    fontSize: 17,
  },
  name: {
    color: '#333',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
