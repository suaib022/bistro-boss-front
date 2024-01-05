import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import UseAxiosPublic from "./UseAxiosPublic";

const UseMenu = () => {

    const axios = UseAxiosPublic();

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         // const specificData = data.filter(item => item.category === category);
    //         setMenu(data);
    //         setLoading(false);
    //     })
    // }, [])

    const {data : menu = [], isPending : loading, refetch} = useQuery({
        queryKey : ['menu'],
        queryFn : async () => {
            const res = await axios.get('/menu');
            return res.data;
        }
    })
    
    return [menu, loading, refetch];
}

export default UseMenu;