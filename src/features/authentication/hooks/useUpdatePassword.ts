import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUserPassword } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdatePassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updatePasswordFn, isPending: isPasswordUpdating } =
    useMutation({
      mutationFn: updateCurrentUserPassword,
      onSuccess: () => {
        toast.success("Password successfully updated.");
        queryClient.removeQueries();
        navigate("/signin", { replace: true });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  return { updatePasswordFn, isPasswordUpdating };
};

export default useUpdatePassword;
