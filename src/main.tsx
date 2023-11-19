import React from "react";
import ReactDOM from "react-dom/client";
import WindowFrame from "@/components/WindowFrame";
import { router } from "@/app/routing";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "@/styles.css";
import store from "@/app/store";
import { Toaster } from "react-hot-toast";
import "@fontsource-variable/inter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WindowFrame>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster
        toastOptions={{
          className: "toast bg-neutral-950",
          error: { className: "toast bg-red-500" },
          icon: null,
        }}
        position="bottom-right"
      />
    </WindowFrame>
  </React.StrictMode>
);
