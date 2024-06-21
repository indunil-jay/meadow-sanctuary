import { useMutation, useQueryClient } from "@tanstack/react-query";
import { STATUS, updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type ICheckingType = {
  bookingId: number;
  breakfast?: object;
};

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkinFn, isPending: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }: ICheckingType) =>
      updateBooking(bookingId, {
        status: STATUS.CHECKED_IN,
        isPaid: true,
        ...breakfast,
      }),

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
