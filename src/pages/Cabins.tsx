import { useState } from "react";

import CabinTable from "../features/cabins/CabinTable";
import CabinForm from "../features/cabins/CabinForm";

const Cabins = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <h1>All Cabins</h1>
      <CabinTable />
      <button onClick={() => setShowForm((show) => !show)}>
        Add new Cabin
      </button>
      {showForm && <CabinForm />}
    </>
  );
};

export default Cabins;
