import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutFn, isPending: isLogouting } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Your were successfully logged out.");
      navigate("/signin", { replace: true });
    },
    onError: () => {
      toast.error("An error has occurred while logging out");
    },
  });

  return {
    logoutFn,
    isLogouting,
  };
};

export default useLogout;
