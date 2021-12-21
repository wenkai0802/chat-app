import axios from "axios";

const HttpClient = axios.create({
  baseURL: "https://wetalk-api.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default HttpClient;
