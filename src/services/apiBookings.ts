import supabase from "./supabase";

export enum STATUS {
  UNCONFIRMED = "unconfirmed",
  CHECKED_IN = "checked-in",
  CHECKED_OUT = "checked-out",
}

export type TBooking = {
  id: number;
  cabinId: number;
  guestId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  startDate: string;
  extrasPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  totalPrice: number;
  observations: string;
  status: STATUS;
};

export type TBookingTableView = {
  id: number;
  created_at: string;
  endDate: string;
  startDate: string;

  numGuests: number;
  numNights: number;
  totalPrice: number;
  status: STATUS;

  guests: {
    fullName: string;
    email: string;
  };
  cabins: {
    name: string;
  };
};

export const getBookings = async (): Promise<TBookingTableView[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id,created_at,endDate,startDate,numNights,numGuests,totalPrice,status,guests(fullName,email),cabins(name)"
    );

  if (error) {
    throw new Error("Bookings could not be retrieved.");
  }

  return data as unknown as TBookingTableView[];
};
