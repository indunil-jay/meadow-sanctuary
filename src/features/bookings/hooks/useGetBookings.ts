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

  //server-side pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading: isGettingBookings, data: bookingsData } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  return {
    isGettingBookings,
    bookings: bookingsData?.bookings,
    count: bookingsData?.count,
  };
};

export default useGetBookings;
