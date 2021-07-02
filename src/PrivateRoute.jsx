import { useAuth } from "./contexts/auth-context";
import { Route, useLocation } from "react-router";
import { Navigate } from "react-router-dom";
export function PrivateRoute({ path, element }) {
  const { token } = useAuth();
  const location = useLocation();
  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
}
