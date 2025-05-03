import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute({ isLoggedIn, user }) {
    if (!isLoggedIn || user.status === 'ban') return <Navigate to='/login' />
    else return <Outlet />
}

export default ProtectedRoute;