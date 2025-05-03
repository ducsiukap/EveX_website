import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute({ isLoggedIn }) {
    if (!isLoggedIn) return <Navigate to='/login' />
    else return <Outlet />
}

export default ProtectedRoute;