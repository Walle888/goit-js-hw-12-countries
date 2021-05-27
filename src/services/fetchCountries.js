import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name/'

export default async function getCountries(query) {
    return axios.get(query).then(resp => resp.data);
}