import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
    const axiosPublic = useAxiosPublic();
    const user = {
        number: "015454544546"
    }
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.number, "isAdmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/verifyAdmin/${user?.number}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];

  
};

export default useAdmin;