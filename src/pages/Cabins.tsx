import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";

const Cabins = () => {
  return (
    <>
      <h1>All Cabins</h1>
      <CabinTable />
      <AddCabin />
    </>
  );
};

export default Cabins;
