import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth/auth.slice';
import { bookmarksSlice } from './bookmarks/bookmarks.slice';
import { userSlice } from './user/user.slice';

const authPersistConfig = {
   key: 'auth',
   storage,
   whitelist: ['authMethod'],
};

const rootReducer = combineReducers({
   auth: persistReducer(authPersistConfig, authSlice.reducer),
   bookmarks: bookmarksSlice.reducer,
   user: userSlice.reducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
