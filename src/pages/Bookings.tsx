import Row from "../components/ui/Row";
import BookingTable from "../features/bookings/BookingTable";

const Bookings = () => {
  return (
    <>
      <Row>
        <h1>All Bookings</h1>
      </Row>
      <BookingTable />
    </>
  );
};

export default Bookings;
