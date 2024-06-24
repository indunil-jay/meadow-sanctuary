import Button from "../../components/ui/Button";
import useCheckOut from "../check-in-out/hooks/useCheckOut";

const CheckoutButton = ({ bookingId }: { bookingId: number }) => {
  const { checkingOutFn, isCheckingOut } = useCheckOut();
  return (
    <Button
      $variation="primary"
      size="small"
      onClick={() => checkingOutFn(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
