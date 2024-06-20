import CabinRow from "./CabinRow";
import Spinner from "../../components/ui/Spinner";
import useGetCabin from "./hooks/useGetCabin";
import Table from "../../components/ui/Table";
import { TCabin } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { cabins, isGettingCabins } = useGetCabin();
  const [searchParams] = useSearchParams();

  //TODO: create component later
  if (!cabins) return <p>Seems to be no cabins in the database.</p>;

  const filterValue = searchParams.get("discount") || "all";

  let filterCabins: TCabin[] = [];

  if (filterValue === "all") {
    filterCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  if (isGettingCabins) return <Spinner />;

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
