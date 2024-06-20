import { useMemo } from "react";
import Filter from "../../components/Filter";
import TableOperations from "../../components/TableOperations";
import Sort from "../../components/Sort";

export enum FilterOption {
  ALL = "all",
  WITH_DISCOUNT = "with-discount",
  NO_DISCOUNT = "no-discount",
}

const CabinTableOperations = () => {
  const filterData = useMemo(
    () => [
      { value: FilterOption.ALL, label: "all" },
      { value: FilterOption.NO_DISCOUNT, label: "no discount" },
      { value: FilterOption.WITH_DISCOUNT, label: "with discount" },
    ],
    []
  );
  const sortData = useMemo(
    () => [
      { value: "name-asc", label: "sort by name (A-Z)" },
      { value: "name-desc", label: "sort by name (Z-A)" },
      { value: "regularPrice-asc", label: "sort by price (low first)" },
      { value: "regularPrice-desc", label: "sort by price (high first)" },
      { value: "maxCapacity-asc", label: "sort by capacity (low first)" },
      { value: "maxCapacity-desc", label: "sort by capacity (high first)" },
    ],
    []
  );
  return (
    <TableOperations>
      <Filter filterValue="discount" options={filterData} />
      <Sort options={sortData} />
    </TableOperations>
  );
};

export default CabinTableOperations;
