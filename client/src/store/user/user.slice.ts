import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import type { UserTypes } from './types';
import { initialState } from './user.state';
import { serviceGetUser, serviceUpdateUser, serviceUploadAvatar } from './user.service';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue, dispatch }) => {
   try {
      const response = await serviceGetUser();
      dispatch(saveUser(response.data));
      return response.data;
   } catch (error) {
      if (error instanceof Error) {
         return rejectWithValue(error);
      }
      return error;
   }
});

export const updateUser = createAsyncThunk(
   'user/updateUser',
   async (data: Partial<UserTypes>, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceUpdateUser(data);
         dispatch(saveUser(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const uploadAvatar = createAsyncThunk(
   'user/uploadAvatar',
   async (file: FormData, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceUploadAvatar(file);
         dispatch(saveAvatar(response.data?.path));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const userSlice = createSlice({
   name: 'authSlice',
   initialState,
   reducers: {
      saveUser(state, action: PayloadAction<UserTypes>) {
         return {
            ...state,
            user: action.payload,
         };
      },

      saveAvatar(state, action: PayloadAction<string>) {
         return {
            ...state,
            userAvatar: action.payload,
         };
      },
   },
});

export const { saveUser, saveAvatar } = userSlice.actions;

export const userState = (state: RootState) => state.user;
