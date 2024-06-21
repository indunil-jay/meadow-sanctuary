import { useMutation, useQueryClient } from "@tanstack/react-query";
import { STATUS, updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkingOutFn, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: STATUS.CHECKED_OUT,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out.`);
      queryClient.invalidateQueries({
        queryKey: ["booking", "bookings", data.id],
      });
    },

    onError: () => {
      toast.error(`There was an error while checking out.`);
    },
  });

  return { checkingOutFn, isCheckingOut };
};

export default useCheckOut;
