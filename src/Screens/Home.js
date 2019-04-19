/* @flow weak */

import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { screensList } from '../../App';

const ListItem = ({ name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.text}>{name}</Text>
  </TouchableOpacity>
);

export default class Home extends Component {
  static navigationOptions = {
    title: 'React Native Animation',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#61DAFB" barStyle="dark-content" />

        <ScrollView style={styles.container}>
          {Object.keys(screensList).map(key => (
            <ListItem
              name={key}
              onPress={() => navigation.navigate(key)}
              key={key}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 1,
    elevation: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
  },
});
