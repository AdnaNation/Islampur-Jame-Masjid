import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    const search = localStorage.getItem('search');
    const {data: users = [], isPending: isUsersLoading, refetch} = useQuery({
         queryKey: ['users', search],
         queryFn: async ()=>{
            const res = await axiosPublic.get(`/users?search=${search}&HomeName=&searchBn=`);
            return res.data
         }
    })
    return [users, isUsersLoading, refetch]
};

export default useUsers;