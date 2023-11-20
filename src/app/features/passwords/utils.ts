import { CreatePasswordInputs, Metadata } from "./password";

export const createPasswordArgs = ({
  account,
  password,
  website,
}: CreatePasswordInputs): { password: string; metadata: Metadata } => {
  if (!account.length && !website.length)
    return { password, metadata: { type: "Empty", is_starred: 0 } };
  return {
    password,
    metadata: { type: "Login", is_starred: 0, account, website },
  };
};
