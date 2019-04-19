/* @flow weak */

import React, { useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from './Button';
import Card, { cardWidth } from './Card';

const list = [
  { id: 1, name: 'Something', tasks: 3 },
  { id: 2, name: 'asfdsaf asd', tasks: 1 },
  { id: 3, name: 'gfdgsd', tasks: 2 },
  { id: 4, name: 'gfd gdfggfd', tasks: 2 },
];

const HorizontalScroll = () => {
  const [animation] = useState(new Animated.Value(0));

  const backgroundInterpolate = animation.interpolate({
    inputRange: [0, cardWidth, cardWidth * 2, cardWidth * 3],
    outputRange: [
      'rgb(74,126,251)',
      'rgb(68,152,124)',
      'rgb(233,128,159)',
      'rgb(238,146,80)',
    ],
  });

  const backgroundStyle = {
    backgroundColor: backgroundInterpolate,
  };

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello fdasf</Text>
      </View>

      <View style={{ flex: 6 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled
          snapToInterval={cardWidth}
          decelerationRate={0.88}
          contentContainerStyle={{ paddingHorizontal: 25 }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: animation } } },
          ])}
        >
          {list.map(({ id, name, tasks }) => (
            <Card key={id} name={name} tasks={tasks} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Button color={backgroundInterpolate} />
      </View>
    </Animated.View>
  );
};

export default HorizontalScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    padding: 42,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
});
