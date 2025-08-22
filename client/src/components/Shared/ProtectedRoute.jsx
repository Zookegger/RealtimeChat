import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

export const ProtectedRoute = ({children}) => {
    const { is_logged_in } = useAuth();

    return is_logged_in ? children : <Navigate to="/login" replace />;
}