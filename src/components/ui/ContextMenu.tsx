import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import styled from "styled-components";

interface ContextMenuContextProps {
  openMenuId: string | null;
  openMenu: (id: string) => void;
  closeMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextProps | undefined>(
  undefined
);

export const useContextMenu = (): ContextMenuContextProps => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenuProvider");
  }
  return context;
};

interface ContextMenuProviderProps {
  children: ReactNode;
}

export const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const openMenu = useCallback((id: string) => {
    setOpenMenuId(id);
  }, []);

  const closeMenu = useCallback(() => {
    setOpenMenuId(null);
  }, []);

  return (
    <ContextMenuContext.Provider value={{ openMenuId, openMenu, closeMenu }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledMenu = styled.div`
  position: absolute;
  top: 100%;
  left: -110px;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-sm);
  z-index: 1000;
  width: max-content;
`;

interface ContextMenuProps {
  id: string;
  children: ReactNode;
}

interface InternalProps {
  isOpen: boolean;
  openMenu: (id: string) => void;
  closeMenu: () => void;
  id: string;
}
const ContextMenu = ({ id, children }: ContextMenuProps) => {
  const { openMenuId, openMenu, closeMenu } = useContextMenu();
  const isOpen = openMenuId === id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !document
          .getElementById(`context-menu-${id}`)
          ?.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, id, closeMenu]);

  return (
    <Container>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<InternalProps>, {
              isOpen,
              openMenu,
              closeMenu,
              id,
            })
          : child
      )}
    </Container>
  );
};

interface ITriggerProps {
  children: ReactNode;
}

const Trigger = ({
  children,
  isOpen,
  openMenu,
  closeMenu,
  id,
}: ITriggerProps & Partial<InternalProps>) => (
  <div onClick={() => (isOpen ? closeMenu?.() : openMenu?.(id!))}>
    {children}
  </div>
);

interface IMenuProps {
  children: ReactNode;
}

interface InternalMenuProps {
  isOpen: boolean;
  id: string;
}

// here id define for identify the open area
const Menu = ({
  children,
  isOpen,
  id,
}: IMenuProps & Partial<InternalMenuProps>) =>
  isOpen ? <StyledMenu id={`context-menu-${id}`}>{children}</StyledMenu> : null;

interface MenuItemProps {
  onClick?: () => void;
  children: ReactNode;
}

const StyledMenuItem = styled.div`
  padding: 1rem 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-grey-700);
  text-transform: capitalize;

  &:hover {
    background-color: var(--color-brand-50);
  }
`;

const MenuItem = ({ onClick, children }: MenuItemProps) => {
  const { closeMenu } = useContextMenu();

  const handleClick = () => {
    if (onClick) onClick();
    closeMenu();
  };

  return <StyledMenuItem onClick={handleClick}>{children}</StyledMenuItem>;
};

ContextMenu.Trigger = Trigger;
ContextMenu.Menu = Menu;
ContextMenu.MenuItem = MenuItem;

export default ContextMenu;
