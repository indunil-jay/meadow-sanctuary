import CabinRow from "./CabinRow";
import Spinner from "../../components/ui/Spinner";
import useGetCabin from "./hooks/useGetCabin";
import Table from "../../components/ui/Table";
import { TCabin } from "../../services/apiCabins";

const CabinTable = () => {
  const { cabins, isGettingCabins } = useGetCabin();

  if (isGettingCabins) return <Spinner />;

  //TODO: create component later
  if (!cabins) return <p>Seems to be no cabins in the database.</p>;

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
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
