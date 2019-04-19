/* @flow weak */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export const tabHeight = Math.ceil((width * 50) / 411);

export default class StaticTabBar extends Component {
  constructor(props) {
    super(props);

    const { tabs } = this.props;
    this.values = tabs.map(
      (t, index) => new Animated.Value(index === 0 ? 1 : 0)
    );
  }

  onPress = index => {
    const { value, tabs } = this.props;
    const tabWidth = width / tabs.length;

    Animated.sequence([
      Animated.parallel(
        this.values.map(v => Animated.timing(v, {
          toValue: 0,
          duration: 100,
        })),
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          useNativeDrive: true,
        }),
        Animated.spring(this.values[index], {
          toValue: 1,
          useNativeDrive: true,
        }),
      ]),
    ]).start();
  };

  render() {
    const { tabs, value } = this.props;
    const tabWidth = width / tabs.length;

    return (
      <View style={styles.container}>
        {tabs.map(({ name }, index) => {
          const cursor = tabWidth * index;

          const opacity = value.interpolate({
            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
          });

          const translateY = this.values[index].interpolate({
            inputRange: [0, 1],
            outputRange: [64, 0],
            extrapolate: 'clamp',
          });

          const opacity1 = this.values[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });

          return (
            <React.Fragment key={index}>
              <TouchableWithoutFeedback onPress={() => this.onPress(index)}>
                <Animated.View style={[styles.tab, { opacity }]}>
                  <Icon name={name} size={25} color="#000" />
                </Animated.View>
              </TouchableWithoutFeedback>

              <Animated.View
                style={[
                  styles.activeIconContainer,
                  {
                    left: tabWidth * index,
                    width: tabWidth,
                    transform: [{ translateY }],
                    opacity: opacity1,
                  },
                ]}
              >
                <View style={styles.activeIcon}>
                  <Icon
                    name={name}
                    size={Math.ceil(tabHeight * 0.5)}
                    color="#000"
                  />
                </View>
              </Animated.View>
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: tabHeight,
  },
  activeIconContainer: {
    position: 'absolute',
    top: -12,
    height: tabHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: 'white',
    width: Math.ceil(tabHeight * 0.88),
    height: Math.ceil(tabHeight * 0.88),
    borderRadius: Math.ceil(tabHeight * 0.88),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
