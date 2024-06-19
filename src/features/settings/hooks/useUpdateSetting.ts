import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../../services/apiSettings";

const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettingFn, isPending: isUpdatingSetting } = useMutation(
    {
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Settings successfully updated.");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return { updateSettingFn, isUpdatingSetting };
};

export default useUpdateSetting;
