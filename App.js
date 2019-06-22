import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import HomeScreen from './src/components/HomeScreen';
import SearchScreen from './src/components/SearchScreen';
import SearchResultListScreen from './src/components/SearchResultListScreen';
import ResultScreen from './src/components/ResultScreen';
import rootReducer from './src/reducers/rootReducer';

const store = createStore(rootReducer);

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Search: SearchScreen,
  SearchResultList: SearchResultListScreen,
  Result: ResultScreen,
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
