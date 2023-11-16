/* eslint-disable no-console */
import axios, { AxiosRequestConfig } from 'axios';
import { apiPaths } from './api.paths';

const apiInstance = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
   headers: {
      Accept: 'application/json',
   },
});

apiInstance.interceptors.request.use(
   (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

apiInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      if (error.response && error.response.status === 401) {
         try {
            const newAccessToken: string = await useRefreshAccessToken();
            const originalRequest: AxiosRequestConfig = error.config;
            if (originalRequest.headers) {
               originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return apiInstance(originalRequest);
         } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            return Promise.reject(refreshError);
         }
      }
      return Promise.reject(error);
   },
);

async function useRefreshAccessToken() {
   const refreshToken = localStorage.getItem('refreshToken');
   try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${apiPaths.auth.refreshToken}`, {
         headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const { newAccessToken } = response.data;

      if (!newAccessToken) {
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');
      }

      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
   } catch (error) {
      console.error('Token refresh failed:', error);
      return Promise.reject(error);
   }
}

export default apiInstance;
