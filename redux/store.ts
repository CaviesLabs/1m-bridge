import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import balanceStateReducer from './balance.state';
import uiStateSliceReducer from './ui';
import whitelistedTokenReducer from './whitelisted-token.state';

export const store = configureStore({
  reducer: {
    balances: balanceStateReducer,
    whitelistedTokens: whitelistedTokenReducer,
    ui: uiStateSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
