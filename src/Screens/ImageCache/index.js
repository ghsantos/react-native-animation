/* @flow weak */

import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Card from './Card';

const carsList = require('./carsList.json');

function getCars() {
  const newCars = JSON.parse(JSON.stringify(carsList));

  return new Promise((resolve, reject) => {
    const cars = [];

    for (let i = 0; i < 14; i++) {
      cars.push(
        ...newCars.splice(Math.floor(Math.random() * newCars.length), 1)
      );
      if (i % 3 === 0) {
        cars[i].photo = 'http://asdjkashdaskdaslf.com/';
      }
    }

    setTimeout(() => resolve(cars), 1500);
  });
}

export default class ImageCache extends Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    getCars().then(cars => this.setState({ cars }));
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Card {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
