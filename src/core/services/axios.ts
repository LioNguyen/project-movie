import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { BaseAxiosResponse } from "@/core/domains/types/services";
import store from "@/core/store";
import { hideLoader, showLoader, showToast } from "@/core/store/globalSlice";

// API configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
};

// Create axios instance
export const axiosInstance: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Show loader for requests
    store.dispatch(showLoader());

    // Add request timestamp
    config.metadata = { startTime: new Date() };

    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error: AxiosError) => {
    store.dispatch(hideLoader());
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    store.dispatch(hideLoader());

    const endTime = new Date();
    const startTime = response.config.metadata?.startTime;
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      } (${duration}ms)`
    );

    return response;
  },
  async (error: AxiosError) => {
    store.dispatch(hideLoader());

    // Handle network errors
    if (error.code === "ERR_NETWORK" || !error.response) {
      console.error("❌ Network Error:", error.message);
      store.dispatch(
        showToast({
          type: "error",
          title: "Network Error!",
        })
      );
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    // Handle other HTTP errors
    const errorData = error.response.data as { message?: string };
    const errorMessage = errorData?.message || "Something went wrong!";
    console.error(`❌ API Error: ${error.response.status} - ${errorMessage}`);

    store.dispatch(
      showToast({
        type: "error",
        title: errorMessage,
      })
    );

    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BaseAxiosResponse<T>> =>
    axiosInstance.get(url, config).then((response) => response.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<BaseAxiosResponse<T>> =>
    axiosInstance.post(url, data, config).then((response) => response.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<BaseAxiosResponse<T>> =>
    axiosInstance.put(url, data, config).then((response) => response.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<BaseAxiosResponse<T>> =>
    axiosInstance.patch(url, data, config).then((response) => response.data),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BaseAxiosResponse<T>> =>
    axiosInstance.delete(url, config).then((response) => response.data),
};

// Extend AxiosRequestConfig to include metadata
declare module "axios" {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
    _retry?: boolean;
  }
}

export default api;
