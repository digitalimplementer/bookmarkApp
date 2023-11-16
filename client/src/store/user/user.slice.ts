import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import type { UserTypes } from './types';
import { initialState } from './user.state';
import { serviceGetUser, serviceUpdateUser } from './user.service';

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
   },
});

export const { saveUser } = userSlice.actions;

export const userState = (state: RootState) => state.user;
