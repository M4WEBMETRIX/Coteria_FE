import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // const token = localStorage.getItem("accessToken");
    const hasAuthHeader = !!originalRequest.headers?.Authorization;

    if (error.response?.status === 401 && !originalRequest._retry && hasAuthHeader) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.data.token;

        localStorage.setItem("accessToken", newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err: any) {
        console.log("err-nuel", err);
        processQueue(err, null);

        localStorage.clear();
        // window.location.href = "/auth/login";

        if (!err.response) {
          return Promise.reject({ message: "Network error" });
        }

        const backendError = err.response.data;

        return Promise.reject({
          message: backendError?.error?.message || backendError?.message || "Something went wrong",
          code: backendError?.error?.code || error.response.status,
        });
        // return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // return Promise.reject(error);
    if (!error.response) {
      return Promise.reject({ message: "Network error" });
    }

    const backendError = error.response.data;

    return Promise.reject({
      message: backendError?.error?.message || backendError?.message || "Something went wrong",
      code: backendError?.error?.code || error.response.status,
    });
  }
);
