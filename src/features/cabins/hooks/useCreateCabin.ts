import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../../services/apiCabins";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewCabinFn, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { createNewCabinFn, isCreating };
};

export default useCreateCabin;
