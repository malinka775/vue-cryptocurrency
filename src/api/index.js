/* eslint-disable no-param-reassign */
import axios from 'axios';

class ApiProvider {
  constructor({ baseURL, headers }, fixCors = false) {
    this.instance = axios.create({
      baseURL,
      headers,
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (fixCors && config.baseURL) {
          config.baseURL = `https://api.allorigins.win/get?url=${encodeURIComponent(config.baseURL)}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  getInstance() {
    return this.instance;
  }
}

export default ApiProvider;
