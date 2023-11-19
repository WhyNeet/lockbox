import App from "@/App";
import AllItems from "@/routes/AllItems";
import Favorites from "@/routes/Favorites";
import Trash from "@/routes/Trash";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/root";
import CreateVault from "@/routes/CreateVault";
import UnlockVault from "@/routes/UnlockVault";
import EntryLayout from "@/components/EntryLayout";

export const router = createBrowserRouter([
  {
    path: "",
    Component: App,
    loader: rootLoader,
    children: [
      {
        path: "/",
        Component: AllItems,
      },
      {
        path: "/favorites",
        Component: Favorites,
      },
      {
        path: "/trash",
        Component: Trash,
      },
    ],
  },
  {
    Component: EntryLayout,
    loader: rootLoader,
    children: [
      {
        path: "/create-vault",
        Component: CreateVault,
      },
      {
        path: "/unlock-vault",
        Component: UnlockVault,
      },
    ],
  },
]);
