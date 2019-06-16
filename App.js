import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import HomeScreen from './src/components/HomeScreen';
import SearchScreen from './src/components/SearchScreen';
import rootReducer from './src/reducers/rootReducer';

const store = createStore(rootReducer);

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Search: SearchScreen,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
