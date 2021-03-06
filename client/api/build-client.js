import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    //we are on the server..

    return axios.create({
      baseURL: 'http://www.ticketing-swistek-prod.xyz',
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

// return axios.create({
//   baseURL:
//     'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
//   headers: req.headers,
// });
