import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
    const axiosPublic = useAxiosPublic();
   const number = localStorage.getItem("Number")
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [number, "isAdmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/verifyAdmin/${number}`);
      return res.data;
    },
  });
  return [isAdmin, isAdminLoading];

  
};

export default useAdmin;