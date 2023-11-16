import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

import { initialState } from './auth.state';
import { serviceRegisterUser, serviceLoginUser } from './auth.services';
import type { AuthMethod, AuthUserDataTypes, ResponseLoggedUserData } from './types';

export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async (data: AuthUserDataTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceRegisterUser(data);
         dispatch(saveAuthUserData(data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async (data: AuthUserDataTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceLoginUser(data);
         dispatch(saveLoggedUserData(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const authSlice = createSlice({
   name: 'authSlice',
   initialState,
   reducers: {
      changeAuthMethod(state, action: PayloadAction<AuthMethod>) {
         return {
            ...state,
            authMethod: action.payload,
         };
      },

      saveAuthUserData(state, action: PayloadAction<AuthUserDataTypes>) {
         return {
            ...state,
            authUserData: action.payload,
         };
      },

      saveLoggedUserData(state, action: PayloadAction<ResponseLoggedUserData>) {
         const { accessToken, refreshToken, email, id } = action.payload;
         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('refreshToken', refreshToken);

         return {
            ...state,
            loggedUserData: { email, id },
         };
      },
   },
});

export const { changeAuthMethod, saveAuthUserData, saveLoggedUserData } = authSlice.actions;

export const authState = (state: RootState) => state.auth;
