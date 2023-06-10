import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://comedores-back.herokuapp.com/'
});