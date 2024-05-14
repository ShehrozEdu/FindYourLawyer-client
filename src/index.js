import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider } from "./components/darkMode/ThemeContext";
import Background from "./components/darkMode/Background";
import Toggle from "./components/darkMode/ThemeToggle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <Background>
      <div className="absolute xl:right-0 lg:right-0 md:right-0 right-9 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
        <Toggle />
      </div>
      <App />
    </Background>
  </ThemeProvider>
);

