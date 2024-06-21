import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";

const useGetBooking = () => {
  const { bookingId } = useParams();
  const { isLoading: isLoadingBooking, data: booking } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId!),
    retry: false,
  });

  return { isLoadingBooking, booking };
};

export default useGetBooking;
