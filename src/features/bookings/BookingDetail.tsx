import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../components/Row";
import Tag from "../../components/Tag";
import useGetBooking from "./hooks/useGetBooking";
import Spinner from "../../components/Spinner";
import ButtonText from "../../components/ButtonText";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../services/apiBookings";
import useCheckOut from "../check-in-out/hooks/useCheckOut";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const { booking, isLoadingBooking } = useGetBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkingOutFn, isCheckingOut } = useCheckOut();
  if (isLoadingBooking) return <Spinner />;

  if (!booking) return;

  const { status, id } = booking!;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <h1>Booking #{id}</h1>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === STATUS.UNCONFIRMED && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        {status === STATUS.CHECKED_IN && (
          <Button onClick={() => checkingOutFn(id)} disabled={isCheckingOut}>
            Check in
          </Button>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
