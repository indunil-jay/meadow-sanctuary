import Row from "../components/ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

const Cabins = () => {
  return (
    <>
      <Row>
        <h1>All Cabins</h1>
        <CabinTableOperations />
      </Row>
      <CabinTable />
      <AddCabin />
    </>
  );
};

export default Cabins;
