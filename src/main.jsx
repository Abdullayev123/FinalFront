import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Cursor from "./components/config/Cursor.jsx";
import LoadingProvider from "./components/context/LoadingProvider.jsx";
import CursorProvider from "./components/context/CursorProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <CursorProvider>
        <Cursor />
        <App />
      </CursorProvider>
    </LoadingProvider>
  </StrictMode>
);
