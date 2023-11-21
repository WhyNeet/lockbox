import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  Password,
  createPassword,
  getPasswords,
  updatePassword,
} from "./password";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface PasswordsState {
  passwords: Password[];
  error: string | null;
}

const initialState: PasswordsState = {
  passwords: [],
  error: null,
};

export const passwordsSlice = createSlice({
  name: "passwords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPasswords.fulfilled, (state, { payload }) => {
      state.passwords = payload;
    });
    builder.addCase(getPasswords.rejected, (state, { payload }) => {
      state.error = payload ?? null;
    });

    builder.addCase(createPassword.fulfilled, (state, { payload }) => {
      state.passwords.push(payload);
    });
    builder.addCase(createPassword.rejected, (state, { payload }) => {
      state.error = payload ?? null;
    });

    builder.addCase(updatePassword.fulfilled, (state, { payload }) => {
      let passwordIdx = -1;
      for (let i = 0; i < state.passwords.length; i++)
        if (state.passwords[i].id === payload.id) passwordIdx = i;

      state.passwords[passwordIdx] = payload;
    });
    builder.addCase(updatePassword.rejected, (state, { payload }) => {
      state.error = payload ?? null;
    });
  },
});

const selectPasswords = (state: RootState) => state.passwords.passwords;

export const usePasswords = () =>
  useSelector<RootState, Password[]>(selectPasswords);
export const usePassword = createSelector(
  [selectPasswords, (_, id: string | null) => id],
  (passwords, id) => {
    console.log("run select password");
    return id ? passwords.find((pass) => pass.id === id) : null;
  }
);
export const {} = passwordsSlice.actions;
export default passwordsSlice.reducer;
