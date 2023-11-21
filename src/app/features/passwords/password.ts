import { createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api";
import { createPasswordArgs } from "./utils";

export type CreatePasswordInputs = {
  password: string;
  account: string;
  website: string;
};

export interface Password {
  id: string;
  password: string;
  metadata: Metadata;
}

export type Metadata = MetadataType & { is_starred: number };

type MetadataType =
  | { type: "Empty" }
  | { type: "Login"; account: string; website: string };

export const getPasswords = createAsyncThunk<
  Password[],
  void,
  { rejectValue: string }
>("passwords/getPasswords", async (_, { rejectWithValue }) => {
  try {
    const passwordsRes: Record<string, string>[] = await invoke(
      "get_all_passwords"
    );
    const passwords: Password[] = passwordsRes.map((pass) => ({
      id: pass["id"],
      password: pass["password"],
      metadata: JSON.parse(pass.metadata as unknown as string) as Metadata,
    }));
    console.log(passwords);
    return passwords;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.message);
  }
});

export const createPassword = createAsyncThunk<
  Password,
  CreatePasswordInputs,
  { rejectValue: string }
>("passwords/createPassword", async (passwordInputs, { rejectWithValue }) => {
  try {
    const passwordRes: Password = await invoke(
      "create_password",
      createPasswordArgs(passwordInputs)
    );
    const password: Password = {
      ...passwordRes,
      metadata: JSON.parse(passwordRes.metadata as unknown as string),
    };

    return password;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.message);
  }
});

export const updatePassword = createAsyncThunk<
  Password,
  Password,
  { rejectValue: string }
>("passwords/updatePassword", async (newPassword, { rejectWithValue }) => {
  try {
    const passwordRes: Password = await invoke("update_password", {
      password: JSON.stringify(newPassword),
    });
    const password: Password = {
      ...passwordRes,
      metadata: JSON.parse(passwordRes.metadata as unknown as string),
    };

    return password;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.message);
  }
});
