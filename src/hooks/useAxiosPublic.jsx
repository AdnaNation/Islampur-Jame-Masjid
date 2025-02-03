import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "https://islampur-jame-masjid-server.vercel.app"
});

const useAxiosPublic = ()=>{
    return axiosPublic;
}

export default useAxiosPublic;