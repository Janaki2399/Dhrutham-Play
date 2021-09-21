import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LibraryProvider } from "./contexts/library-context";
import { AuthProvider } from "./contexts/auth-context";
import { CategoryProvider } from "./contexts/category-context";
import { ToastProvider } from "./contexts/toast-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <LibraryProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </LibraryProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
