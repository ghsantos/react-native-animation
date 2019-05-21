/**
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './src/Screens/Home';
import screensList from './screensList';

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
