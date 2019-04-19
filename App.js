/**
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './src/Screens/Home';

import Count from './src/Screens/Count';
import Color from './src/Screens/Color';
import Test from './src/Screens/Test';
import Rotate from './src/Screens/Rotate';
import WRPercentage from './src/Screens/WRPercentage';
import Spring from './src/Screens/Spring';
import Event from './src/Screens/Event';
import Decay from './src/Screens/Decay';
import Parallel from './src/Screens/Parallel';
import Corners from './src/Screens/Corners';
import KittenCards from './src/Screens/KittenCards';
import Tabbar from './src/Screens/Tabbar';
import StaggerForm from './src/Screens/StaggerForm';
import ProgressBar from './src/Screens/ProgressBar';
import Questionnaire from './src/Screens/Questionnaire';
import AnimatedHeader from './src/Screens/AnimatedHeader';
import Cat from './src/Screens/Cat';
import HorizontalScroll from './src/Screens/HorizontalScroll';

export const screensList = {
  StaggerForm,
  Questionnaire,
  ProgressBar,
  Tabbar,
  KittenCards,
  Count,
  Event,
  Decay,
  AnimatedHeader,
  Cat,
  HorizontalScroll,
};

const TabNavigator = createStackNavigator(
  { Home, ...screensList },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#61DAFB',
      },
      headerTintColor: '#282C34',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default createAppContainer(TabNavigator);