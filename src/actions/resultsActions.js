import { UPDATE_RESULTS } from '../types';

export function updateResults(apiResponseData) {
    return {
        type: UPDATE_RESULTS,
        payload: apiResponseData,
    };
}