import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Password } from "./password";
import { invoke } from "@tauri-apps/api";
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

export const getPasswords = createAsyncThunk<
  Password[],
  void,
  { rejectValue: string }
>("passwords/getPasswords", async (_, { rejectWithValue }) => {
  try {
    const passwords: Password[] = await invoke("get_all_passwords");
    console.log(passwords);
    return passwords;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.message);
  }
});

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
  },
});

export const usePasswords = () =>
  useSelector<RootState, Password[]>((state) => state.passwords.passwords);
export const {} = passwordsSlice.actions;
export default passwordsSlice.reducer;
