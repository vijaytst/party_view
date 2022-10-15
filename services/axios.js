import axios from 'axios';

//   baseURL: 'https://viewingpartyserver.herokuapp.com/',

const instance = axios.create({
  baseURL: 'https://viewingpartyserver.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers['x-access-token'] = token;
  }
};

export const DeleterAuthToken = () => {
  window.localStorage.removeItem('accessToken');
  axios.defaults.headers['x-access-token'] = '';
};

export const DeleteAuthToken = () => {
  window.localStorage.removeItem('accessToken');
  axios.defaults.headers['x-access-token'] = '';
};

export default instance;
