export function updateSearchParams(params) {
    return {
        type: 'UPDATE_SEARCH_PARAMS',
        payload: params,
    };
}