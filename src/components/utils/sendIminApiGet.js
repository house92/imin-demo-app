import axios from 'axios';

import { apiKey } from '../../../secrets';

export default function sendIminApiGet(path) {
  const headers = {
    'X-API-KEY': apiKey,
  };
  return axios.get(`https://search.imin.co${path}`, { headers });
}