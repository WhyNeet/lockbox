import { invoke } from "@tauri-apps/api";
import { LoaderFunction, redirect } from "react-router-dom";

export const rootLoader: LoaderFunction = async ({ request }) => {
  const isVaultCreated = await invoke("vault_created");

  console.log(isVaultCreated);

  const { pathname } = new URL(request.url);

  if (!isVaultCreated && pathname !== "/create-vault")
    return redirect("/create-vault");

  const isVaultUnlocked = await invoke("vault_unlocked");

  if (isVaultCreated && !isVaultUnlocked && pathname !== "/unlock-vault")
    return redirect("/unlock-vault");

  return null;
};
