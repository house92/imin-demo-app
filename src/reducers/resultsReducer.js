export default resultsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_RESULTS':
            state = action.payload;
            break;
        default:
            return state;
    }
}
