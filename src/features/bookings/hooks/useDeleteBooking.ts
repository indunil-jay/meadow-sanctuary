import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isPending: isLoadingDeleting, mutate: deleteBookinFn } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success(`Booking was successfully deleted.`);
    },
    onError: () => {
      toast.error(`There was an error deleting booking.`);
    },
  });

  return {
    isLoadingDeleting,
    deleteBookinFn,
  };
};

export default useDeleteBooking;
