import axios from "axios";

const instance = axios.create({
    baseURL: 'https://exclusive-bistro-back.vercel.app/'
})

const UseAxiosPublic = () => {
    return instance;
};

export default UseAxiosPublic;