import apiInstance from 'api';
import { apiPaths } from 'api/api.paths';

import type { UserTypes } from './types';

export const serviceGetUser = () => {
   return apiInstance.get(apiPaths.users.get);
};

export const serviceUpdateUser = (data: Partial<UserTypes>) => {
   return apiInstance.patch(apiPaths.users.update, data);
};
