import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useGetBookings = () => {
  const [searchParams] = useSearchParams();

  //server-side filtering
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? undefined
      : { field: "status", value: filterValue };

  //server-side sorting
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [field, order] = sortValue.split("-");
  const sort = { field, order };

  const { isLoading: isGettingBookings, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  return { isGettingBookings, bookings };
};

export default useGetBookings;
