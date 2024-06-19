import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/apiCabins";

const useGetCabin = () => {
  const { isLoading: isGettingCabins, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isGettingCabins, cabins };
};

export default useGetCabin;
