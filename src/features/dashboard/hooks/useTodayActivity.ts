import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "../../../services/apiBookings";

const useTodayActivity = () => {
  const { data: actvityData, isLoading: isActivityLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getTodayActivity,
  });

  return { isActivityLoading, actvityData };
};

export default useTodayActivity;
