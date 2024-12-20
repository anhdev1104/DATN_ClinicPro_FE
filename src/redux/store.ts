import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { departmentApi } from './api/department';
import { globalSlice } from './globalStore';
import { usersApi } from './api/users';
import { setupListeners } from '@reduxjs/toolkit/query';
import { servicesApi } from './api/services';
import { statisticsApi } from './api/statistics';
const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['auth'],
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
});
const persisted = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persisted,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(departmentApi.middleware, usersApi.middleware, servicesApi.middleware, statisticsApi.middleware),
});

const persistor = persistStore(store);
// listener when network reconnect or window refocus
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default persistor;
