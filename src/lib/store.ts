import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from '@/src/lib/features/boardSlice';
import { listSlice } from '@/src/lib/features/listSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      board: boardSlice.reducer,
      list: listSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
