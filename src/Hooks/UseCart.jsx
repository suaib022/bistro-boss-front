import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
// import UseAxiosPublic from "./UseAxiosPublic";
import UseAxios from "./UseAxiosSecure";


const UseCart = () => {

    const axios  = UseAxios();
    const {user} = UseAuth();

    const {refetch, data : cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })

    return [cart, refetch];
};

export default UseCart;