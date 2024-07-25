import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ONE_HOUR } from "../constants/Time";

export const axiosInstance = axios.create({
  baseURL: "http://43.203.218.49:8080",
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
  response => {
    // 인증 토큰이 있다면 로컬스토리지에 저장
    if (response.headers["authorization"]) {
      // 만료시간을 함께저장
      const now = new Date();
      const token = { value: response.headers["authorization"], expires: now.getTime() + ONE_HOUR };
      localStorage.setItem("token", JSON.stringify(token));
    }

    return response.data;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  //auth있으면 헤더에 넣기
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      // 토큰의 만료시간보다 지났으면 토큰 삭제
      config.headers.Authorization = `${JSON.parse(token).value}`;
    }

    return config;
  },
  req => {
    return req;
  },
);
