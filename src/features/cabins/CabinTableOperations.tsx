import { useMemo } from "react";
import Filter from "./Filter";
import TableOperations from "./TableOperations";

export enum FilterOption {
  ALL = "all",
  WITH_DISCOUNT = "with-discount",
  NO_DISCOUNT = "no-discount",
}

const CabinTableOperations = () => {
  const dataArray = useMemo(
    () => [
      { value: FilterOption.ALL, label: "all" },
      { value: FilterOption.NO_DISCOUNT, label: "no discount" },
      { value: FilterOption.WITH_DISCOUNT, label: "with discount" },
    ],
    []
  );
  return (
    <TableOperations>
      <Filter filterValue="discount" options={dataArray} />
    </TableOperations>
  );
};

export default CabinTableOperations;
