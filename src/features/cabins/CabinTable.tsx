import CabinRow from "./CabinRow";
import Spinner from "../../components/ui/Spinner";
import useGetCabin from "./hooks/useGetCabin";
import Table from "../../components/ui/Table";
import { TCabin } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { FilterOption } from "./CabinTableOperations"; // Ensure this import is correct

const CabinTable = () => {
  const { cabins, isGettingCabins } = useGetCabin();
  const [searchParams] = useSearchParams();

  if (isGettingCabins) return <Spinner />;

  // TODO: create component later
  if (!cabins) return <p>Seems to be no cabins in the database.</p>;

  // 1. Client-side filter
  const filterValue = searchParams.get("filter") || FilterOption.ALL;

  let filteredCabins: TCabin[] = [];

  if (filterValue === FilterOption.ALL) {
    filteredCabins = cabins;
  } else if (filterValue === FilterOption.NO_DISCOUNT) {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === FilterOption.WITH_DISCOUNT) {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2. Client-side sort
  const sortValue = searchParams.get("sort") || "name-asc";
  const [fieldName, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    const aValue = a[fieldName as keyof TCabin];
    const bValue = b[fieldName as keyof TCabin];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * modifier;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return 0;
  });

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body<TCabin>
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
