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

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const { booking, isLoadingBooking } = useGetBooking();
  const moveBack = useMoveBack();
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
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
