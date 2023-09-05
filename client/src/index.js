import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);