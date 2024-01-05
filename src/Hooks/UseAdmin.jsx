import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxiosSecure";

const UseAdmin = () => {
    
    const axios = UseAxios();
    const {user, loading} = UseAuth();

    const {data : isAdmin, isPending : isAdminloading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() => {
            const res = await axios.get(`/user/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminloading];
};

export default UseAdmin;