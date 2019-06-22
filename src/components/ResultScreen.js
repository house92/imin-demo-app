import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import formatDateTime from './utils/formatDateTime';
import sendIminApiGet from './utils/sendIminApiGet';
import { backgroundColor } from '../styles';

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };

    this.handlePickerValueChange = this.handlePickerValueChange.bind(this);
  }

  componentDidMount() {
    if (this.state.result === null) {
      const resultIdentifier = this.props.navigation.getParam('resultIdentifier', '');
      sendIminApiGet(`/events-api/v2/event-series/${resultIdentifier}`)
        .then(res => {
          const result = res.data;
          const locations = result['imin:locationSummary']
            .map(location => ({
              label: location.name,
              key: location.id,
            }));
          const newState = {
            result,
            locations,
            selectedLocationKey: locations[0].key,
          };
          this.setState({
            ...this.state,
            ...newState,
          });
        });
    }
  }

  handlePickerValueChange(selectedLocationKey) {
    this.setState({
      ...this.state,
      selectedLocationKey,
    });
  }

  render() {
    const { result } = this.state;

    if (result === null) {
      return <View />;
    }

    const selectedLocation = result['imin:locationSummary']
      .find(location => location.id === this.state.selectedLocationKey);

    let image;
    if (result.image && result.image.length > 0) {
      image = <Image style={styles.image} source={{ uri: result.image[0].url }} />;
    }

    let times = [];
    const sessionSeries = result.subEvent.find(sessionSeries => sessionSeries.location.id === this.state.selectedLocationKey);
    if (sessionSeries.subEvent && sessionSeries.subEvent.length > 0) {
      for (const scheduledSession of sessionSeries.subEvent) {
        const formattedDateTime = formatDateTime(scheduledSession.startDate);
        times.push(<Text key={scheduledSession.startDate}>{formattedDateTime}</Text>);
      }
    }
    return (
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          {image}
          <Text style={styles.title}>{result.name}</Text>
          <ModalSelector
            data={this.state.locations}
            selectedKey={this.state.selectedLocationKey}
            onChange={option => this.handlePickerValueChange(option.key)}
          />
          <View style={styles.times}>
            {times}
          </View>
          <Text>
            {result.description}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    backgroundColor,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10,
    marginBottom: 5,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    height: 150,
  },
  title: {
    fontWeight: '600',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  times: {
    margin: 5,
  },
});
