
import useUsers from "./useUsers";


const useHomeName = () => {
    
  const [users]= useUsers();
  const homeName = [...new Set(users.map(user => user.HomeName))]
    return [homeName];
};

export default useHomeName;