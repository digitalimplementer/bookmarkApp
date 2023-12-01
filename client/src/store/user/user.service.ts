import apiInstance from 'api';
import { apiPaths } from 'api/api.paths';

import type { UserTypes } from './types';

export const serviceGetUser = () => {
   return apiInstance.get(apiPaths.users.get);
};

export const serviceUpdateUser = (data: Partial<UserTypes>) => {
   return apiInstance.patch(apiPaths.users.update, data);
};

export const serviceUploadAvatar = (file: FormData) => {
   return apiInstance.post(apiPaths.users.uploadAvatar, file, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
};

export const serviceGetAvatar = () => {
   return apiInstance.get(apiPaths.users.getAvatar);
};

export const serviceRemoveAvatar = () => {
   return apiInstance.post(apiPaths.users.removeAvatar);
};
