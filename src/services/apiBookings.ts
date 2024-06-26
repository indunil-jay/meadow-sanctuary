import { PAGE_SIZE } from "../constants";
import { getToday } from "../utils/dateFormatHelper";
import { TCabin } from "./apiCabins";
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

type TBookingFilter = {
  filter:
    | {
        field: string;
        value: string;
      }
    | undefined;
  sort:
    | {
        field: string;
        order: string;
      }
    | undefined;

  page: number | undefined;
};

export type TBookingReturnType = {
  bookings: TBookingTableView[];
  count: number | null;
};

//get all bookings
export const getBookings = async ({
  filter,
  sort,
  page,
}: TBookingFilter): Promise<TBookingReturnType> => {
  let query = supabase.from("bookings").select(
    "id,created_at,endDate,startDate,numNights,numGuests,totalPrice,status,guests(fullName,email),cabins(name)",
    { count: "exact" } //this retuns count of data
  );

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (sort) {
    query = query.order(sort.field, { ascending: sort.order === "asc" });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + (PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be retrieved.");
  }

  const bookings = data as unknown as TBookingTableView[];

  return { bookings, count };
};

export type TGuest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalID: string;
};

export type TBookingData = TBooking & {
  cabins: TCabin;
  guests: TGuest;
};

//get booking by id

export const getBooking = async (id: number): Promise<TBookingData> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as TBookingData;
};

//update booking by id

export const updateBooking = async (
  id: number,
  obj: Partial<TBooking>
): Promise<TBooking> => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
};

//delete booking by id

export const deleteBooking = async (id: number) => {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
};

export type TBookingsAfterDate = {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
};

//get all booking that are were created after the given date
export const getBookingsAfterDate = async (
  date: string
): Promise<TBookingsAfterDate[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

export type TStaysAfterDate = {
  guests: {
    fullName: string;
  };
};

// get all stays that are were created after the given date
export const getStaysAfterDate = async (
  date: string
): Promise<(TBooking & TStaysAfterDate)[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

//get today activity
export type TTodayActivity = TBooking & {
  guests: Pick<TGuest, "fullName" | "nationality" | "countryFlag">;
};

export const getTodayActivity = async (): Promise<TTodayActivity[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as TTodayActivity[];
};
