import { appWindow } from "@tauri-apps/api/window";
import { channel } from "./useChannel";

export const sizeChannel = channel<boolean>();

appWindow.onResized(async () => {
  sizeChannel.send(await appWindow.isMaximized());
});
