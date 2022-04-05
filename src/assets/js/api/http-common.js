import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`,
  header: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const { data, status } = err.response;
    if (status == 401) {
      alert("請回到登入");
    } else {
      alert(data);
    }
    return Promise.reject(err);
  }
);

export default http;
