import React, { Component } from 'react';
import { View, TextInput, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import axios from 'axios';
import querystring from 'query-string';

import { apiKey } from '../../secrets';
import { updateSearchParams } from '../actions/searchActions';
import { updateResults } from '../actions/resultsActions';

// import { Container } from './styles';

const params = [
  {
    name: 'geo[radial]',
    type: 'number',
    required: true,
    basic: true,
  },
  {
    name: 'mode',
    tag: Picker,
    options: [
      'upcoming-sessions',
      'discovery-geo',
      'discovery-geo-asc',
      'discovery-geo-desc',
    ],
    default: 'upcoming-sessions',
    required: true,
    basic: true,
  },
  {
    name: 'page',
    type: 'number',
    required: false,
    basic: false,
  },
  {
    name: 'limit',
    type: 'number',
    required: false,
    basic: false,
  },
  {
    name: 'activityId',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'accessibilitySupportId',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'specialRequirementId',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'genderRestriction',
    tag: Picker,
    options: [
      'oa:NoRestriction',
      'oa:MaleOnly',
      'oa:FemaleOnly',
    ],
    required: false,
    basic: true,
  },
  {
    name: 'levelType',
    tag: Picker,
    options: [
      'imin:BeginnerLevel',
      'imin:IntermediateLevel',
      'imin:AdvancedLevel',
    ],
    required: false,
    basic: true,
  },
  {
    name: 'leaderGender',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'startDate[gte]',
    type: 'date',
    required: false,
    basic: true,
  },
  {
    name: 'startDate[lte]',
    type: 'date',
    required: false,
    basic: true,
  },
  {
    name: 'startTime[gte]',
    type: 'time',
    required: false,
    basic: true,
  },
  {
    name: 'startTime[lte]',
    type: 'time',
    required: false,
    basic: true,
  },
  {
    name: 'ageRange[includeRange]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'ageRangeMax[lte]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'ageRangeMin[gte]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'dayOfWeek',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'priceAdult[gte]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'priceAdult[lte]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'activityConceptCollectionId',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'organizerId',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'organizerName[textSearch]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'amenityFeatureType[valueTrue]',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'activityInScheme',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'membershipRequiredAdult',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'membershipRequiredJunior',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'isWheelchairAccessible',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'availableChannelAdult',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'availableChannelJunior',
    tag: Picker,
    options: [

    ],
    required: false,
    basic: false,
  },
].map(param => ({
  ...param,
  name: encodeURIComponent(param.name), // Encode param names for form
}));

class SearchScreen extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const decodedParams = {};
    Object.entries(values).map(([key, value]) => {
      decodedParams[decodeURIComponent(key)] = value;
    });
    const query = querystring.stringify(decodedParams);
    const headers = { 'X-API-KEY': apiKey };
    axios.get(`https://search.imin.co/events-api/v2/event-series?${query}`, { headers })
      .then(res => {
        updateSearchParams(decodedParams);
        updateResults(res.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    const formValues = {
      ...this.props.formValues,
    };
    // Set default values for dropdowns
    for (const param of params.filter(param => param.tag === Picker)) {
      formValues[param.name] = formValues[param.name] || param.default;
    }
    const fields = props => {
      return params.filter(param => param.basic).map(param => {
        if (param.tag === Picker) {
          const options = param.options.map(option => <Picker.Item value={option} label={option} key={option}/>);
          return (
            <Picker
              selectedValue={props.values[param.name]}
            >
              {options}
            </Picker>
          );
        }
        return (
          <TextInput
            onChangeText={props.handleChange(param.name)}
            onBlur={props.handleBlur(param.name)}
            value={props.values[param.name]}
          />
        );
      });
    };

    return (
      <Formik
        initialValues={formValues}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <View>
            {fields(props)}
            <Button onPress={props.handleSubmit} title="Search" />
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state;
  return search;
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateSearchParams,
    updateResults,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
