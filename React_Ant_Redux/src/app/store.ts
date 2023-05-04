import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import UserDataReducer from '../features/userDataSlice';

export const store = configureStore({
  reducer: {
    userdata: UserDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
