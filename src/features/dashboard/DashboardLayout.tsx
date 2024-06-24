import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings";
import Spinner from "../../components/Spinner";
import useRecentStays from "./hooks/useRecentStays";
import Stats from "./Stats";
import useGetCabin from "../cabins/hooks/useGetCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isRecentBookingLoading } = useRecentBookings();
  const { isRecentStayLoading, confirmedStays, numofDays } = useRecentStays();
  const { isGettingCabins, cabins } = useGetCabin();

  if (isRecentBookingLoading || isRecentStayLoading || isGettingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings!}
        numOfDays={numofDays}
        confirmedStays={confirmedStays!}
        cabinCount={cabins!.length}
      />
      <div>today's activity</div>
      <DurationChart confirmedStays={confirmedStays!} />
      <SalesChart bookings={bookings!} numOfDays={numofDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
