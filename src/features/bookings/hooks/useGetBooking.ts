import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";

const useGetBooking = () => {
  const { bookingId } = useParams();
  const id = Number(bookingId);

  const { isLoading: isLoadingBooking, data: booking } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id!),
    retry: false,
  });

  return { isLoadingBooking, booking };
};

export default useGetBooking;
