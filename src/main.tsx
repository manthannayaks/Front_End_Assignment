import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // or .jsx if you don’t use TS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);