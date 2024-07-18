import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://43.203.249.116:8080",
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
      localStorage.setItem("token", `${response.headers["authorization"]}`);
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
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  req => {
    return req;
  },
);
