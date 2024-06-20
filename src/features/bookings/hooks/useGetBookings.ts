import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../constants";

const useGetBookings = () => {
  const queryClient = useQueryClient();
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

  const {
    isLoading: isGettingBookings,
    data: bookingsData,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  if (error) {
    throw new Error("Error fetching bookings");
  }

  const pageCount = Math.ceil((bookingsData?.count || 0) / PAGE_SIZE);

  //pre fetching
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  }

  return {
    isGettingBookings,
    bookings: bookingsData?.bookings,
    count: bookingsData?.count,
  };
};

export default useGetBookings;
