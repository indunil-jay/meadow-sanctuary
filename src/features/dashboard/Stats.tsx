import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import {
  TBooking,
  TBookingsAfterDate,
  TStaysAfterDate,
} from "../../services/apiBookings";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/currancyFormatHelpers";

type TStats = {
  bookings: TBookingsAfterDate[];
  confirmedStays: (TStaysAfterDate & TBooking)[];
  numOfDays: number;
  cabinCount: number;
};

const Stats = ({ bookings, confirmedStays, numOfDays, cabinCount }: TStats) => {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const rate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numOfDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(rate * 100) + "%"}
      />
    </>
  );
};

export default Stats;
