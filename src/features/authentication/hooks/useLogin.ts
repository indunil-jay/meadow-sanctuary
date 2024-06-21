import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TLogin, login } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const { isPending: isLogin, mutate: loginFn } = useMutation({
    mutationFn: ({ email, password }: TLogin) => login({ email, password }),
    onSuccess: async () => {
      toast.success("You have successfully logged in.");
      navigate("/dashboard");
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
