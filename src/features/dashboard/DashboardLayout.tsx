import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings";
import Spinner from "../../components/Spinner";
import useRecentStays from "./hooks/useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isRecentBookingLoading } = useRecentBookings();
  const { confirmedStays, stays, isRecentStayLoading } = useRecentStays();

  if (isRecentBookingLoading || isRecentStayLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>today's activity</div>
      <div>chart stay duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
