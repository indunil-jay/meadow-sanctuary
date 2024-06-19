import Modal from "../../components/ui/Modal";
import CabinForm from "./CabinForm";
import Button from "../../components/ui/Button";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open openWindowName="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Content name="cabin-form">
          <CabinForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   return (
//     <div>
//       {" "}
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
