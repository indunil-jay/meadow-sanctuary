import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

// get data from cash , we have set data when login, if not fetching data
const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
};

export default useUser;
