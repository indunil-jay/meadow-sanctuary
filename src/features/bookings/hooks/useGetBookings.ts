import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";

const useGetBookings = () => {
  const { isLoading: isGettingBookings, data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isGettingBookings, bookings };
};

export default useGetBookings;
