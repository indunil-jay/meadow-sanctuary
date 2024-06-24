import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../../services/apiBookings";

const useRecentStays = () => {
  //get how many dates from parms
  const [searchParams] = useSearchParams();
  const numofDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // get start date from today's date
  const queryDates = subDays(new Date(), numofDays).toISOString();

  const { isLoading: isRecentStayLoading, data: stays } = useQuery({
    queryKey: ["bookings", `last-${numofDays}`],
    queryFn: () => getStaysAfterDate(queryDates),
  });

  //get only confirmed stays
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isRecentStayLoading, stays, confirmedStays };
};

export default useRecentStays;
