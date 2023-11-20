import App from "@/App";
import AllItems from "@/routes/AllItems";
import Favorites from "@/routes/Favorites";
import Trash from "@/routes/Trash";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/root";
import CreateVault from "@/routes/CreateVault";
import UnlockVault from "@/routes/UnlockVault";
import EntryLayout from "@/components/EntryLayout";
import ErrorBoundary from "@/routes/ErrorBoundary";
import PasswordView from "@/routes/PasswordView";
import CreatePassword from "@/routes/CreatePassword";

export const router = createBrowserRouter([
  {
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "",
    Component: App,
    loader: rootLoader,
    children: [
      {
        path: "/all",
        Component: AllItems,
        children: [
          {
            path: "new",
            Component: CreatePassword,
          },
          {
            path: ":id",
            Component: PasswordView,
          },
        ],
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
