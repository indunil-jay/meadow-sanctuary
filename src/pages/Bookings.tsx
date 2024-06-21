import Row from "../components/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const Bookings = () => {
  return (
    <>
      <Row>
        <h1>All Bookings</h1>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
};

export default Bookings;
