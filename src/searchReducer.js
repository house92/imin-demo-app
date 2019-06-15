import { combineReducers } from 'redux';

const searchInitialState = {
    formValues: {},
};

const searchReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const reducers = combineReducers({
    search: searchReducer,
});

export default reducers;
