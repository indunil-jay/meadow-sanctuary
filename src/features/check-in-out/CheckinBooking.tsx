import styled from "styled-components";
import { useEffect, useState } from "react";

import useGetSettings from "../settings/hooks/useGetSettings";
import useGetBooking from "../bookings/hooks/useGetBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import Spinner from "../../components/Spinner";
import Row from "../../components/Row";
import ButtonText from "../../components/ButtonText";
import Checkbox from "../../components/forms/Checkbox";
import { formatCurrency } from "../../utils/currancyFormatHelpers";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/ui/Button";
import useCheckin from "./hooks/useCheckin";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);

  const { booking, isLoadingBooking } = useGetBooking();
  const { isSettingDataLoading, settings } = useGetSettings();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const { checkinFn, isChecking } = useCheckin();

  if (isLoadingBooking || isSettingDataLoading) return <Spinner />;
  if (!booking) return;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking!;

  const optionalBreakfastPrice =
    settings!.breakfastPrice * numNights * numGuests;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    checkinFn(bookingId);
  };

  return (
    <>
      <Row type="horizontal">
        <h1>Check in booking #{bookingId}</h1>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isChecking}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
