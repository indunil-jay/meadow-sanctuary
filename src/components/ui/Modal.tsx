import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Changed to rgba for transparency */
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
    color: var(--color-grey-500);
  }
`;

interface IModalContext {
  open: (name: string) => void;
  close: () => void;
  openName: string | undefined;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpenName] = useState<string | undefined>();

  const close = () => setOpenName(undefined);
  const open = (name: string) => setOpenName(name);

  const contextValue: IModalContext = {
    open,
    close,
    openName,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({
  children,
  openWindowName,
}: {
  children: React.ReactElement;
  openWindowName: string;
}) => {
  const { open } = useModal();
  return cloneElement(children, { onClick: () => open(openWindowName) });
};

const Content = ({
  children,
  name,
}: {
  children: React.ReactElement;
  name: string;
}) => {
  const { openName, close } = useModal();
  const { modalRef } = useDetectOutsideClick(close);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.getElementById("modal")!
  );
};

Modal.Open = Open;
Modal.Content = Content;

export default Modal;
