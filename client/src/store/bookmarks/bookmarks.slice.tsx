import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

import { initialState } from './bookmarks.state';
import type { ActionBookmarkTypes, BookmarkTypes } from './types';
import {
   serviceCreateBookmark,
   serviceGetAllBookmarks,
   serviceGetBookmark,
   serviceDeleteBookmark,
   serviceEditBookmark,
} from './bookmarks.services';

export const createBookmark = createAsyncThunk(
   'bookmarks/createBookmark',
   async (data: ActionBookmarkTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceCreateBookmark(data);
         dispatch(addBookmarkToState(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const fetchBookmarks = createAsyncThunk(
   'bookmarks/fetchBookmarks',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceGetAllBookmarks();
         dispatch(addBookmarsToState(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const fetchSingleBookmark = createAsyncThunk(
   'bookmarks/fetchSingleBookmark',
   async (id: string, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceGetBookmark(id);
         dispatch(saveSingleBookmark(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const deleteBookmark = createAsyncThunk(
   'bookmarks/deleteBookmark',
   async (id: string, { rejectWithValue }) => {
      try {
         const response = await serviceDeleteBookmark(id);
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const editBookmark = createAsyncThunk(
   'bookmarks/editBookmark',
   async ({ id, data }: { id: string; data: ActionBookmarkTypes }, { rejectWithValue }) => {
      try {
         const response = await serviceEditBookmark(id, data);
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const bookmarksSlice = createSlice({
   name: 'bookmarksSlice',
   initialState,
   reducers: {
      addBookmarkToState(state, action: PayloadAction<BookmarkTypes>) {
         return {
            ...state,
            bookmarks: [action.payload, ...state.bookmarks],
         };
      },
      addBookmarsToState(state, action: PayloadAction<BookmarkTypes[]>) {
         return {
            ...state,
            bookmarks: action.payload,
         };
      },

      saveSingleBookmark(state, action: PayloadAction<BookmarkTypes>) {
         return {
            ...state,
            bookmark: action.payload,
         };
      },
   },
});

export const { addBookmarkToState, addBookmarsToState, saveSingleBookmark } = bookmarksSlice.actions;

export const bookmarksState = (state: RootState) => state.bookmarks;
