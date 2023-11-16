import apiInstance from 'api';
import { apiPaths } from 'api/api.paths';
import type { AuthUserDataTypes, LoginCredetialsTypes } from './types';

export const serviceRegisterUser = (data: AuthUserDataTypes) => {
   return apiInstance.post(apiPaths.auth.register, data);
};

export const serviceLoginUser = (data: LoginCredetialsTypes) => {
   return apiInstance.post(apiPaths.auth.login, data);
};
