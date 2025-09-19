import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
