import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const isAuthorised = useSelector((state) => state.loginStatus.loginStatus);
    return isAuthorised ? children : <Navigate to='/login' />;
}