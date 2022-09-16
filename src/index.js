import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import store from "./redux/store/store";
// import { Provider } from "react-redux";
import { ThemeProvider } from "./components/darkMode/ThemeContext";
import Background from "./components/darkMode/Background";
import Toggle from "./components/darkMode/ThemeToggle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <Background>
      <div className="absolute lg:right-0 right-10 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
        <Toggle />
      </div>
      <App />
    </Background>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
