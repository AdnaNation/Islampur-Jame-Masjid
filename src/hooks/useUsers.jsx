import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    const {data: users = [], isPending: isUsersLoading, refetch} = useQuery({
         queryKey: ['users'],
         queryFn: async ()=>{
            const res = await axiosPublic.get('/users');
            return res.data
         }
    })
    return [users, isUsersLoading, refetch]
};

export default useUsers;