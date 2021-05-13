import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setUserLogIn] = useState(false);

  const navigate = useNavigate();

  const validateLogin = (email, password, state) => {
    if (email === "admin@gmail.com" && password === "admin") {
      setUserLogIn(true);
      navigate(state?.from ? state.from : "/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setUserLogIn,
        validateLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
