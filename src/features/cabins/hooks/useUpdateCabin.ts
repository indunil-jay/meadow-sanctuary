import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TCabinFormData } from "../CabinForm";
import { updateCabin } from "../../../services/apiCabins";

const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCabinfn, isPending: isUpdating } = useMutation({
    mutationFn: ({
      cabin,
      id,
    }: {
      cabin: Partial<TCabinFormData>;
      id: string;
    }) => updateCabin(cabin, +id),
    onSuccess: () => {
      toast.success("Cabin successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { updateCabinfn, isUpdating };
};

export default useUpdateCabin;
