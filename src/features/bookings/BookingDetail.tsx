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
import Modal from "../../components/ui/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import useDeleteBooking from "./hooks/useDeleteBooking";
import Empty from "../../components/Empty";

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
  const { deleteBookinFn, isLoadingDeleting } = useDeleteBooking();
  if (isLoadingBooking) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id } = booking;

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
        <Modal>
          <Modal.Open openWindowName="delete-booking">
            <Button $variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Content name="delete-booking">
            <ConfirmDelete
              resource="booking"
              onConfirm={() =>
                deleteBookinFn(id, {
                  onSettled: () => {
                    navigate(-1);
                  },
                })
              }
              disabled={isLoadingDeleting}
            />
          </Modal.Content>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
