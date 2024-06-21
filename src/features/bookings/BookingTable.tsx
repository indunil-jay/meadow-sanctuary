import Pagination from "../../components/Pagination";
import { ContextMenuProvider } from "../../components/ui/ContextMenu";
import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";
import Table from "../../components/ui/Table";
import BookingRow from "./BookingRow";
import useGetBookings from "./hooks/useGetBookings";

function BookingTable() {
  const { bookings, count, isGettingBookings } = useGetBookings();

  if (isGettingBookings) return <Spinner />;

  if (!bookings || !count) return <Empty resourceName="bookings" />;

  return (
    <ContextMenuProvider>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </ContextMenuProvider>
  );
}

export default BookingTable;
