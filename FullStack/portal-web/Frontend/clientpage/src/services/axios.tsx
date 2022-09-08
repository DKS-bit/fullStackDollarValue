const axios = require('axios').default;


export const api = axios.create({
    baseURL: 'https://localhost:7173',
});


