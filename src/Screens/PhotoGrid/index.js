/* @flow weak */

import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import images from './images';

export default class PhotoGrid extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    activeImage: null,
    activeIndex: null,
    size: new Animated.ValueXY(),
    position: new Animated.ValueXY(),
    animation: new Animated.Value(0),
  };

  _gridImages = {};
  _viewImage = null;

  handleOpenImage = index => {
    this._gridImages[index].measure((x, y, width, height, pageX, pageY) => {
      this._x = pageX;
      this._y = pageY;
      this._width = width;
      this._height = height;

      this.state.position.setValue({ x: pageX, y: pageY });

      this.state.size.setValue({ x: width, y: height });

      this.setState({ activeImage: images[index], activeIndex: index });

      this._viewImage.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
        Animated.parallel([
          Animated.spring(this.state.position.x, { toValue: tPageX }),
          Animated.spring(this.state.position.y, { toValue: tPageY }),
          Animated.spring(this.state.size.x, { toValue: tWidth }),
          Animated.spring(this.state.size.y, { toValue: tHeight }),
          Animated.spring(this.state.animation, { toValue: 1 }),
        ]).start();
      });
    });
  };

  handleClose = () => {
    Animated.parallel([
      Animated.timing(this.state.position.x, {
        toValue: this._x,
        duration: 250,
      }),
      Animated.timing(this.state.position.y, {
        toValue: this._y,
        duration: 250,
      }),
      Animated.timing(this.state.size.x, {
        toValue: this._width,
        duration: 250,
      }),
      Animated.timing(this.state.size.y, {
        toValue: this._height,
        duration: 250,
      }),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 250,
      }),
    ]).start(() => this.setState({ activeImage: null }));
  };

  render() {
    const animatedContentTranslate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    const animatedContentStyles = {
      opacity: this.state.animation,
      transform: [{ translateY: animatedContentTranslate }],
    };

    const activeImageStyle = {
      width: this.state.size.x,
      height: this.state.size.y,
      top: this.state.position.y,
      left: this.state.position.x,
    };

    const activeIndexStyle = {
      opacity: this.state.activeImage ? 0 : 1,
    };

    const animatedCloseStyle = {
      opacity: this.state.animation,
    };

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
            {images.map((src, index) => {
              const style =
                index === this.state.activeIndex ? activeIndexStyle : {};

              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => this.handleOpenImage(index)}
                >
                  <Image
                    source={src}
                    style={[styles.gridImage, style]}
                    resizeMode="cover"
                    ref={img => {
                      this._gridImages[index] = img;
                    }}
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>

        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? 'auto' : 'none'}
        >
          <View
            style={styles.topContent}
            ref={img => {
              this._viewImage = img;
            }}
          >
            <Animated.Image
              key={this.state.activeImage}
              source={this.state.activeImage}
              resizeMode="cover"
              style={[styles.viewImage, activeImageStyle]}
            />
          </View>

          <Animated.View style={[styles.content, animatedContentStyles]}>
            <Text style={styles.title}>Pretty Image from Unsplash</Text>

            <Text>
              Et fore instituendarum. Ab an culpa nulla summis te officia dolor
              vidisse iudicem. Iis eiusmod ne laborum, iis laborum
              reprehenderit, enim probant occaecat, ut ita quae minim illum.
              Minim eiusmod offendit ea elit deserunt ea praesentibus, legam se
              laborum non export, aute pariatur vidisse, do e ipsum possumus,
              possumus, vidisse non legam expetendis, et eiusmod in nostrud non
              ne et multos ne et multos anim legam.Quis ullamco ad cohaerescant
              de est an dolore nescius eu mandaremus tempor aliqua e irure,
              fabulas dolore veniam se tempor quo de noster elit magna laboris,
              pariatur multos tempor a illum si sint commodo iis minim tempor,
              singulis eram arbitror. Ita magna ex quorum, laboris legam cillum
              labore. Eu ipsum vidisse offendit in fore ut ne elit iudicem. Aut
              aute.
            </Text>
          </Animated.View>

          <TouchableWithoutFeedback onPress={this.handleClose}>
            <Animated.View style={[styles.close, animatedCloseStyle]}>
              <Text style={styles.closeText}>X</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: '33.3%',
    height: 150,
  },
  topContent: {
    flex: 1,
    backgroundColor: '#fff0',
  },
  content: {
    flex: 2,
    backgroundColor: '#fff',
  },
  viewImage: {
    width: null,
    height: null,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 28,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    fontSize: 28,
    backgroundColor: 'transparent',
    color: '#fff',
  },
});
