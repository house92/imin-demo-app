import {
    UPDATE_SEARCH_PARAMS,
    UPDATE_SEARCH_LOCATION,
    UPDATE_SEARCH_RADIUS,
} from '../types';

const searchInitialState = {
  formValues: {},
};

const searchReducer = (state = searchInitialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_SEARCH_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case UPDATE_SEARCH_RADIUS:
      return {
        ...state,
        radius: action.payload,
      };
    default:
      return state;
  }
}

export default searchReducer;
