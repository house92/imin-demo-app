import React, { Component } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';

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
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  const { search } = state;
  return search;
}

export default connect(mapStateToProps)(HomeScreen);
