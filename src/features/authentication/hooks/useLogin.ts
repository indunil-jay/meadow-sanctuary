import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TLogin, login } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLogin, mutate: loginFn } = useMutation({
    mutationFn: ({ email, password }: TLogin) => login({ email, password }),
    onSuccess: async (data) => {
      toast.success("You have successfully logged in.");
      await queryClient.setQueryData(["user"], data.user); //set sign data to query cashe prevent re-fetching when first time dashboard is loaded
      navigate("/dashboard", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    loginFn,
    isLogin,
  };
};

export default useLogin;
