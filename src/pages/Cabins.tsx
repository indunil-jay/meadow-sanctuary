import { useEffect, useState } from "react";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

const Cabins = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>All Cabins</h1>
      <CabinTable />
      <button onClick={() => setShowForm((show) => !show)}>
        Add new Cabin
      </button>
      {showForm && <CreateCabinForm />}
    </>
  );
};

export default Cabins;
