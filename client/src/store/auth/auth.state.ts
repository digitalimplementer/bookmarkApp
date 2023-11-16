import type { AuthSliceTypes } from './types';

export const initialState: AuthSliceTypes = {
   authMethod: 'register',
   authUserData: {
      email: '',
      password: '',
   },
   loggedUserData: null,
};
