import { useMutation, useQueryClient } from "@tanstack/react-query";
import { STATUS, updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkinFn, isPending: isChecking } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: STATUS.CHECKED_IN, isPaid: true }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);
      queryClient.invalidateQueries({ queryKey: ["booking", "bookings"] });
      navigate("/");
    },

    onError: () => {
      toast.error(`There was an error while checking in.`);
    },
  });

  return { checkinFn, isChecking };
};

export default useCheckin;
