export function updateResults(apiResponseData) {
    return {
        type: 'UPDATE_RESULTS',
        payload: apiResponseData,
    };
}