import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import resultsReducer from './resultsReducer';

const reducers = combineReducers({
    search: searchReducer,
    results: resultsReducer,
});

export default reducers;