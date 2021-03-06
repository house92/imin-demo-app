import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableWithoutFeedback, View, Image, Text } from 'react-native';

import formatDateTime from './utils/formatDateTime';
import sortLocations from './utils/sortLocations';

function formatDistance(distance) {
  let distanceInMiles;
  if (distance.unitCode === 'KMT') {
    distanceInMiles = (distance.value / 1.609344).toPrecision(2);
  } else if (distance.unitCode === 'SMI') {
    distanceInMiles = distance.value.toPrecision(2);
  }
  const unit = distanceInMiles === 1 ? 'mile' : 'miles';
  return `${distanceInMiles} ${unit}`;
}

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(resultIdentifier) {
    this.props.navigation.navigate('Result', { resultIdentifier });
  }

  render() {
    const { result } = this.props;

    let image = <View style={styles.image} />;
    if (result.image && result.image.length > 0) {
      const { thumbnail } = result.image[0];
      const optimalThumbnail = thumbnail.find(image => image.width && image.width === image.height) || thumbnail[0];
      const imageSource = optimalThumbnail.url;
      image = <Image style={styles.image} source={{ uri: imageSource }} />;
    }

    // If sorting by start date then only one result anyway, and if sorting by distance then get the nearest
    let time;
    const location = sortLocations(result['imin:locationSummary'])[0];
    const sessionSeries = result.subEvent.find(sessionSeries => sessionSeries.location.id === location.id);
    if (sessionSeries.subEvent && sessionSeries.subEvent.length > 0) {
      time = formatDateTime(sessionSeries.subEvent[0].startDate);
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.handlePress(result.identifier)}>
        <View style={styles.container}>
          {image}
          <View style={styles.details}>
            <Text style={styles.title}>{result.name}</Text>
            <Text>{time}</Text>
            <View style={styles.location}>
              <Image source={require('../../assets/pin.png')} />
              <Text>{formatDistance(location.geo['imin:distanceFromGeoQueryCenter'])}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 3,
  },
  title: {
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
