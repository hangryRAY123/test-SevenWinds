import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/index.scss";
import App from "./App.tsx";
import initializeEntity from "./api/initializeEntity";

const startApp = async () => {
  if (!localStorage.getItem("entityId")) {
    try {
      const entityId = await initializeEntity();
      localStorage.setItem("entityId", entityId.toString());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

startApp();
