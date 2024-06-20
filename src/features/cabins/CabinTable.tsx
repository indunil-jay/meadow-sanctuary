import CabinRow from "./CabinRow";
import Spinner from "../../components/ui/Spinner";
import useGetCabin from "./hooks/useGetCabin";
import Table from "../../components/ui/Table";
import { TCabin } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { FilterOption } from "./CabinTableOperations";

const CabinTable = () => {
  const { cabins, isGettingCabins } = useGetCabin();
  const [searchParams] = useSearchParams();

  if (isGettingCabins) return <Spinner />;

  //TODO: create component later
  if (!cabins) return <p>Seems to be no cabins in the database.</p>;

  const filterValue = searchParams.get("discount") || FilterOption.ALL;

  let filterCabins: TCabin[] = [];

  if (filterValue === FilterOption.ALL) {
    filterCabins = cabins;
  }
  if (filterValue === FilterOption.NO_DISCOUNT) {
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === FilterOption.WITH_DISCOUNT) {
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

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
        data={filterCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
