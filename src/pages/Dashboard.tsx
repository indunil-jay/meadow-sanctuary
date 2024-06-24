import Row from "../components/Row";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <>
      <Row>
        <h1>Dashboard</h1>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
