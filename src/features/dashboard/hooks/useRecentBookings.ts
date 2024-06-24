import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../../services/apiBookings";

const useRecentBookings = () => {
  //get how many dates from parms
  const [searchParams] = useSearchParams();
  const numofDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // get start date from today's date
  const queryDates = subDays(new Date(), numofDays).toISOString();

  const { isLoading: isRecentBookingLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numofDays}`],
    queryFn: () => getBookingsAfterDate(queryDates),
  });

  return { isRecentBookingLoading, bookings };
};

export default useRecentBookings;
