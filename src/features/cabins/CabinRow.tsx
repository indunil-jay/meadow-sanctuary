import styled from "styled-components";

import { TCabin } from "../../services/apiCabins";
import { formatCurrency } from "../../utils/currancyFormatHelpers";
import CabinForm from "./CabinForm";
import useDeleteCabin from "./hooks/useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../components/ui/Modal";
import ConfirmDelete from "../../components/ui/ConfirmDelete";
import Table from "../../components/ui/Table";

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

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>

      <div>
        <Modal>
          {/* edit */}
          <Modal.Open openWindowName="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Content name="edit">
            <CabinForm currentCabin={cabin} />
          </Modal.Content>
          {/* delete */}
          <Modal.Open openWindowName="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Content name="delete">
            <ConfirmDelete
              resource="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabinFn(cabinId)}
            />
          </Modal.Content>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
