import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type { ReactNode, FC } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isLogged = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  });

  return isLogged ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
