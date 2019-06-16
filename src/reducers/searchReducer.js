const searchInitialState = {
    formValues: {},
};

export default searchReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH_PARAMS':
            state = action.payload;
            break;
        default:
            return state;
    }
}
