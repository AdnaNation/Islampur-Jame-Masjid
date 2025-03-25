import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import useUsers from "../hooks/useUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const AdminDashboard = () => {
    const [users] = useUsers()
    const axiosPublic = useAxiosPublic()
      const {
        data, refetch
      } = useQuery({
        queryKey: [],
        queryFn: async () => await axiosPublic.get('/activeStatus'),
      });
      console.log(data);
    const handleTrue = async()=>{
         await axiosPublic.patch('/activity').then(res=>{
            refetch()
            console.log(res.data);
         })
    }
    return (
        <div className="max-w-4xl min-h-screen mx-auto border p-2">
         <button className="text-4xl" onClick={handleTrue}>
         {
            data?.data? <MdOutlineToggleOn /> :<MdOutlineToggleOff />
         }
         </button>
         
       টোটাল সদস্যঃ {users.length}

        </div>
    );
};

export default AdminDashboard;