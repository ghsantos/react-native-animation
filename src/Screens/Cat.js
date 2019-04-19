/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Cat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.catFace}>
            <View style={styles.catFaceAfter} />
            <View style={styles.catFaceBefore} />

            <View style={styles.nose}>
              <View style={styles.noseAfter} />
            </View>

            <View style={styles.mouth}>
              <View style={styles.mouthBefore} />
              <View style={styles.mouthAfter} />
            </View>

            <View style={styles.eyes}>
              <View style={styles.eyesBefore} />
              <View style={styles.eyesAfter} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE5AF',
  },
  catFace: {
    backgroundColor: '#E58C56',
    width: 100,
    height: 100,
    borderRadius: 50,
    transform: [{ scale: 1.4 }],
  },
  catFaceBefore: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    borderRadius: 1,
    transform: [{ rotate: '90deg' }],
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 30,
    borderRightColor: 'transparent',
    borderBottomWidth: 30,
    borderBottomColor: '#E58C56',
  },
  catFaceAfter: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    borderRadius: 1,
    transform: [{ rotate: '-90deg' }],
    borderLeftWidth: 30,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 30,
    borderBottomColor: '#E58C56',
  },
  nose: {
    position: 'absolute',
    width: 0,
    height: 0,
    bottom: 0,
    left: 4,
    borderRightWidth: 46,
    borderRightColor: 'transparent',
    borderLeftWidth: 46,
    borderLeftColor: 'transparent',
    borderBottomWidth: 84,
    borderBottomColor: '#FFF',
    borderRadius: 50,
    alignItems: 'center',
  },
  noseAfter: {
    position: 'absolute',
    top: 50,
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#000',
  },
  mouth: {
    position: 'absolute',
    width: 50,
    height: 11,
    top: 73,
    left: '50%',
    marginLeft: -25,
    overflow: 'hidden',
  },
  mouthBefore: {
    position: 'absolute',
    left: 3,
    bottom: 0,
    width: 23,
    height: 25,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
  },
  mouthAfter: {
    position: 'absolute',
    right: 3,
    bottom: 0,
    width: 23,
    height: 25,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 14,
  },
  eyes: {
    position: 'absolute',
    top: 50,
    width: 55,
    left: '50%',
    marginLeft: -27,
  },
  eyesBefore: {
    position: 'absolute',
    width: 13,
    height: 13,
    backgroundColor: '#000',
    left: 0,
    top: 0,
    borderRadius: 7,
  },
  eyesAfter: {
    position: 'absolute',
    width: 13,
    height: 13,
    backgroundColor: '#000',
    right: 0,
    top: 0,
    borderRadius: 7,
  },
});
