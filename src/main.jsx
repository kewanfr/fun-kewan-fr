import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from "react-router-dom";

import "./App.css";
import App from "./App.tsx";

// createRoot(document.getElementById("root")).render(
//   <HashRouter>
//     <App />
//   </HashRouter>
// );

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);