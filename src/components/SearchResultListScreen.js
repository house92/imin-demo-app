import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import SearchResult from './SearchResult';
import { backgroundColor } from '../styles';

class SearchResultListScreen extends Component {
  render() {
    console.log(this.props.results);
    if (!this.props.results['imin:item']) {
      return (
        <Text>
          Your search return no results. Please adjust the paramters and try again.
        </Text>
      );
    }
    const results = this.props.results['imin:item'].map((eventSeries, i) => {
      return <SearchResult result={eventSeries} key={`${eventSeries.identifier}#${i}`} />;
    });
    return (
      <ScrollView style={styles.container}>
        {results}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
});

const mapStateToProps = (state) => {
  const { results } = state;
  return { results };
}

export default connect(mapStateToProps)(SearchResultListScreen);
