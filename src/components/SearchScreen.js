/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';
import querystring from 'query-string';
import * as yup from 'yup';

import { primaryColor } from '../styles';
import {
  updateSearchParams,
  updateSearchLocation,
  updateSearchRadius,
} from '../actions/searchActions';
import { updateResults } from '../actions/resultsActions';
import sendIminApiGet from './utils/sendIminApiGet';

const params = [
  {
    name: 'radius',
    label: 'Radius (miles)',
    tag: 'selector',
    options: [
      {
        label: '1',
        value: 1,
        key: 1,
      },
      {
        label: '3',
        value: 3,
        key: 3,
      },
      {
        label: '5',
        value: 5,
        key: 5,
      },
      {
        label: '10',
        value: 10,
        key: 10,
      },
      {
        label: '15',
        value: 15,
        key: 15,
      },
      {
        label: '20',
        value: 20,
        key: 20,
      },
    ],
    default: 5,
    required: true,
    basic: true,
  },
  {
    name: 'mode',
    label: 'Sorting mode',
    tag: 'selector',
    options: [
      {
        label: 'earliest',
        value: 'upcoming-sessions',
        key: 'upcoming-sessions',
      },
      {
        label: 'nearest',
        value: 'discovery-geo',
        key: 'discovery-geo',
      },
      {
        label: 'price (asc)',
        value: 'discovery-price-asc',
        key: 'discovery-price-asc',
      },
      {
        label: 'price (desc)',
        value: 'discovery-price-desc',
        key: 'discovery-price-desc',
      },
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
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'accessibilitySupportId',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'specialRequirementId',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'genderRestriction',
    label: 'Classes for',
    tag: 'selector',
    options: [
      {
        label: 'mixed',
        value: 'oa:NoRestriction',
        key: 'oa:NoRestriction',
      },
      {
        label: 'men',
        value: 'oa:MaleOnly',
        key: 'oa:MaleOnly',
      },
      {
        label: 'women',
        value: 'oa:FemaleOnly',
        key: 'oa:FemaleOnly',
      },
    ],
    required: false,
    basic: true,
  },
  {
    name: 'levelType',
    label: 'Level',
    tag: 'selector',
    options: [
      {
        label: 'beginner',
        value: 'imin:BeginnerLevel',
        key: 'imin:BeginnerLevel',
      },
      {
        label: 'intermediate',
        value: 'imin:IntermediateLevel',
        key: 'imin:IntermediateLevel',
      },
      {
        label: 'advanced',
        value: 'imin:AdvancedLevel',
        key: 'imin:AdvancedLevel',
      },
    ],
    required: false,
    basic: true,
  },
  {
    name: 'leaderGender',
    tag: 'selector',
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
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'ageRangeMax[lte]',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'ageRangeMin[gte]',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'dayOfWeek',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'priceAdult[gte]',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'priceAdult[lte]',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'activityConceptCollectionId',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'organizerId',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'organizerName[textSearch]',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'amenityFeatureType[valueTrue]',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'activityInScheme',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'membershipRequiredAdult',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'membershipRequiredJunior',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'isWheelchairAccessible',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'availableChannelAdult',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
  {
    name: 'availableChannelJunior',
    tag: 'selector',
    options: [

    ],
    required: false,
    basic: false,
  },
].map(param => ({
  ...param,
  name: encodeURIComponent(param.name), // Encode param names for form
}));

const CONSTANT_PARAMS = {
  limit: 20,
};

// Used in Formik
const formSchema = {
  radius: yup.number().required(),
  mode: yup.string().required(),
  genderRestriction: yup.string(),
  levelType: yup.string(), 
};

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        ...this.props.formValues,
      },
    };
    this.handlePickerValueChange = this.handlePickerValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.updateSearchLocation(position.coords);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  handleSubmit(values) {
    // Get decoded params ready for query string
    // TODO: figure out why values var isn't updating
    const mergedValues = {
      ...values,
      ...this.state.formValues,
      ...CONSTANT_PARAMS,
    };
    const decodedParams = {};
    Object.entries(mergedValues).map(([key, value]) => {
      decodedParams[decodeURIComponent(key)] = value;
    });

    // Construct geo[radial]
    const { latitude, longitude } = this.props.location;
    decodedParams['geo[radial]'] = `${latitude},${longitude},${decodedParams.radius}`;
    delete decodedParams.radius;

    const query = querystring.stringify(decodedParams);

    sendIminApiGet(`/events-api/v2/event-series?${query}`)
      .then(res => {
        this.props.updateSearchParams(decodedParams);
        this.props.updateResults(res.data);
        this.props.navigation.navigate('SearchResultList');
      })
      .catch(err => console.error(err));
  }

  handlePickerValueChange(param, value) {
    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        [param]: value,
      },
    });
  }

  render() {
    const { formValues } = this.state;
    // Set default values for dropdowns
    for (const param of params.filter(param => param.tag === 'selector')) {
      formValues[param.name] = formValues[param.name] || param.default;
    }
    const fields = props => {
      return params.filter(param => param.basic).map(param => {
        if (param.tag === 'selector') {
          return (
            <View style={styles.field} key={param.name}>
              <Text style={styles.label}>{param.label}</Text>
              <ModalSelector
                data={param.options}
                initValue={'none'}
                selectedKey={formValues[param.name] || param.default}
                onChange={(option) => {
                  this.handlePickerValueChange(param.name, option.value);
                }}
                style={styles.selector}
              />
            </View>
          );
        }
        return (
          <View style={styles.field} key={param.name}>
            <Text style={styles.label}>{param.label}</Text>
            <TextInput
              onChangeText={props.handleChange(param.name)}
              onBlur={props.handleBlur(param.name)}
              value={props.values[param.name]}
            />
          </View>
        );
      });
    };

    return (
      <Formik
        initialValues={formValues}
        onSubmit={this.handleSubmit}
        validationSchema={
          yup.object().shape(formSchema)
        }
      >
        {props => (
          <View>
            {fields(props)}
            <Button
              onPress={props.handleSubmit}
              title="Search"
              color={primaryColor}
            />
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 50,
  },
  label: {
    flex: 1,
  },
  selector: {
    flex: 3,
  },
});

const mapStateToProps = (state) => {
  const { search } = state;
  return search;
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateSearchParams,
    updateSearchLocation,
    updateSearchRadius,
    updateResults,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
