import { configureStore } from "@reduxjs/toolkit";
import passwords from "./features/passwords/passwordsSlice";

const store = configureStore({
  reducer: {
    passwords,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
