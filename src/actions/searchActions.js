import {
  UPDATE_SEARCH_PARAMS,
  UPDATE_SEARCH_LOCATION,
  UPDATE_SEARCH_RADIUS,
} from '../types';

export function updateSearchParams(params) {
  return {
    type: UPDATE_SEARCH_PARAMS,
    payload: params,
  };
}

export function updateSearchLocation(location) {
  return {
    type: UPDATE_SEARCH_LOCATION,
    payload: location,
  };
}

export function updateSearchRadius(radius) {
  console.log(radius);
  return {
    type: UPDATE_SEARCH_RADIUS,
    payload: radius,
  };
}