import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://13.125.179.134:8080",
  //timeout: 5000,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(req => {
  //TODO: auth있으면 헤더에 넣기
  return req;
});
