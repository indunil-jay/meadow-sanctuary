import styled from "styled-components";
import { format, isToday } from "date-fns";

import { STATUS, TBookingTableView } from "../../services/apiBookings";
import Tag from "../../components/Tag";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/currancyFormatHelpers";
import { formatDistanceFromNow } from "../../utils/dateFormatHelper";
import ContextMenu from "../../components/ui/ContextMenu";
import { HiDotsVertical } from "react-icons/hi";
import { HiArrowDownOnSquare, HiOutlineEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const BookingRow = ({ booking }: { booking: TBookingTableView }) => {
  const {
    cabins,
    endDate,
    guests,
    numNights,
    startDate,
    status,
    totalPrice,
    id,
  } = booking;
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabins.name}</Cabin>

      <Stacked>
        <span>{guests.fullName}</span>
        <span>{guests.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <ContextMenu id={`context-menu-${id}`}>
        <ContextMenu.Trigger>
          <HiDotsVertical />
        </ContextMenu.Trigger>
        <ContextMenu.Menu>
          <ContextMenu.MenuItem onClick={() => navigate(`/bookings/${id}`)}>
            <HiOutlineEye size={16} />
            View Details
          </ContextMenu.MenuItem>
          {status === STATUS.UNCONFIRMED && (
            <ContextMenu.MenuItem onClick={() => navigate(`/checkin/${id}`)}>
              <HiArrowDownOnSquare size={16} />
              Check in
            </ContextMenu.MenuItem>
          )}
        </ContextMenu.Menu>
      </ContextMenu>
    </Table.Row>
  );
};

export default BookingRow;
