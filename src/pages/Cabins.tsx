import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";

const Cabins = () => {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>All Cabins</h1>
      <CabinTable />
    </>
  );
};

export default Cabins;
