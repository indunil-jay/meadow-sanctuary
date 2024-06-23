import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../services/apiAuth";
import toast from "react-hot-toast";

const useSignUp = () => {
  const { mutate: signupFn, isPending: isSigningUp } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account successfully created");
      setTimeout(() => {
        toast.success("Verify your account with your email address");
      }, 1000);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { signupFn, isSigningUp };
};

export default useSignUp;
