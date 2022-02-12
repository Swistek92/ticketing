import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    //we are on the server

    return axios.create({
      baseURL: 'http://www.ticketing-swistek-prod.xyz/',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
    // we are in browser
  }
};

export default buildClient;
