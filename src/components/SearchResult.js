import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import moment from 'moment';

// import { Container } from './styles';

function formatDateTime(dateTime) {
  return moment(dateTime).format('HH:mm Do MMM');
}

export default class SearchResult extends Component {
  render() {
    const { result } = this.props;

    const { thumbnail } = result.image[0];
    const imageSource = (thumbnail.find(image => image.width && image.width === image.height) || thumbnail[0]).url;

    // If sorting by start date then only one result anyway, and if sorting by distance then get the nearest
    const location = result['imin:locationSummary'].sort((a, b) => a.geo['imin:distanceFromGeoQueryCenter'].value - b.geo['imin:distanceFromGeoQueryCenter'].value)[0];
    const sessionSeries = result.subEvent.find(sessionSeries => sessionSeries.location.id === location.id);
    return (
      <View>
        <Image source={{ uri: imageSource }} />
        <Text>{result.name}</Text>
        <Text>{location.name}</Text>
        <Text>{formatDateTime(sessionSeries.subEvent[0].startDate)}</Text>
      </View>
    );
  }
}
