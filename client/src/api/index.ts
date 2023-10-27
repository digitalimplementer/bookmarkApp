import axios, { AxiosRequestConfig } from 'axios';

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

// apiInstance.interceptors.response.use(
//    (response) => {
//       return response;
//    },
//    async (error) => {
//       if (error.response && error.response.status === 401) {
//          try {
//             const newAccessToken: string = await useRefreshAccessToken();
//             const originalRequest: AxiosRequestConfig = error.config;
//             if (originalRequest.headers) {
//                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             }
//             return instance(originalRequest);
//          } catch (refreshError) {
//             console.error('Token refresh failed:', refreshError);
//             return Promise.reject(refreshError);
//          }
//       }
//       return Promise.reject(error);
//    },
// );

// async function useRefreshAccessToken() {
//    const refreshToken = localStorage.getItem('refreshToken');
//    try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/auth/refresh`, {
//          headers: { Authorization: `Bearer ${refreshToken}` },
//       });
//       const { accessToken } = response.data;

//       if (!accessToken) {
//          localStorage.removeItem('accessToken');
//          localStorage.removeItem('refreshToken');
//       }
//       localStorage.setItem('accessToken', accessToken);
//       return accessToken;
//    } catch (error) {
//       console.error('Token refresh failed:', error);
//       return Promise.reject(error);
//    }
// }

export default apiInstance;
