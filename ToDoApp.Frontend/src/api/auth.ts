import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
export const http = axios.create({ baseURL: API_BASE });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export interface AuthResponse {
  token: string;
  // refreshToken: string;
  // user: { id: string; username: string; email: string };
}

export const login = (data: LoginDto) => {
  return http.post<AuthResponse>("/auth/login", data);
};

export const register = (data: RegisterDto) => {
  return http.post<AuthResponse>("/auth/register", data);
};

// export const refreshToken = () =>
//   http.post<{ token: string }>("/auth/refresh", {
//     token: localStorage.getItem("refreshToken"),
//   });

// Optionally, handle 401 responses to auto-refresh
// http.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const status = err.response?.status;
//     if (status === 401) {
//       try {
//         const { data } = await refreshToken();
//         localStorage.setItem('token', data.token);
//         err.config.headers.Authorization = `Bearer ${data.token}`;
//         return axios(err.config);
//       } catch {
//         // force logout
//         localStorage.clear();
//         window.location.href = '/auth';
//       }
//     }
//     return Promise.reject(err);
//   }
// );
