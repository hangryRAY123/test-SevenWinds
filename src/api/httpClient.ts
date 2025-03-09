import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://185.244.172.108:8081/",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default httpClient;
