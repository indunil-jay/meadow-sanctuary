import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUserFn, isPending: isUpdatingUser } =
    useMutation({
      mutationFn: updateCurrentUser,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        toast.success("User updated successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  return { updateCurrentUserFn, isUpdatingUser };
};
