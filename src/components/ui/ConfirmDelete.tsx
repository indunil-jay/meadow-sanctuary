import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type Props = {
  resource: string;
  disabled: boolean;
  onConfirm: () => void;
  onCloseModal?: () => void;
};

const ConfirmDelete = ({
  resource,
  onConfirm,
  disabled,
  onCloseModal,
}: Props) => {
  return (
    <StyledConfirmDelete>
      <h3>Delete {resource}</h3>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button $variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button $variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
