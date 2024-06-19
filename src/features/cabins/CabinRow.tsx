import styled from "styled-components";
import { useState } from "react";

import { TCabin } from "../../services/apiCabins";
import { formatCurrency } from "../../utils/currancyFormatHelpers";
import CabinForm from "./CabinForm";
import useDeleteCabin from "./hooks/useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type Props = {
  cabin: TCabin;
};

const CabinRow = ({ cabin }: Props) => {
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;
  const { deleteCabinFn, isDeleting } = useDeleteCabin();

  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </Discount>
        <div>
          <button disabled={isDeleting} onClick={() => deleteCabinFn(cabinId)}>
            Delete
          </button>
          <button onClick={() => setShowForm((s) => !s)}>Edit</button>
        </div>
      </TableRow>

      {showForm && <CabinForm currentCabin={cabin} />}
    </>
  );
};

export default CabinRow;
