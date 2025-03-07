import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    const search = localStorage.getItem('search');
    const home = localStorage.getItem('homeName');
    const {data: users = [], isPending: isUsersLoading, refetch} = useQuery({
         queryKey: ['users', search, home],
         queryFn: async ()=>{
            const res = await axiosPublic.get(`/users?search=${search}&HomeName=${home}&searchBn=`);
            return res.data
         }
    })
    return [users, isUsersLoading, refetch]
};

export default useUsers;