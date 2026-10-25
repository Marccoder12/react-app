import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./mainStyle.css";
import { registerServiceWorker } from "./Utils/registerServiceWorker";

registerServiceWorker().catch(console.error);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
);
