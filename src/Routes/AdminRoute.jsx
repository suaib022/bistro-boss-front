import UseAdmin from '../Hooks/UseAdmin';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {

    const [isAdmin, isAdminloading] = UseAdmin();
    const { user, loading } = UseAuth();
    const location = useLocation(); 

    if (loading || isAdminloading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default AdminRoute;