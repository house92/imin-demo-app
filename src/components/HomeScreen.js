import React, { Component } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import { backgroundColor, primaryColor } from '../styles';

class HomeScreen extends Component {
  render() {
      return (
        <View style={styles.container}>
          <Image
            source={require('../../assets/imin_logo.png')}
          />
          <Button
            title="Start a search"
            onPress={() => this.props.navigation.navigate('Search')}
            color={primaryColor}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor,
  },
});

const mapStateToProps = (state) => {
  const { search } = state;
  return search;
}

export default connect(mapStateToProps)(HomeScreen);
