import { ReactElement, createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.header<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface IModalContext {
  columns: string;
}

const TableContext = createContext<IModalContext | undefined>(undefined);

const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};

const Table = ({
  columns,
  children,
}: {
  children: React.ReactNode;
  columns: string;
}) => {
  const tableValue: IModalContext = {
    columns,
  };

  return (
    <TableContext.Provider value={tableValue}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const { columns } = useTable();
  return (
    <StyledHeader columns={columns} role="row" as="header">
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => {
  const { columns } = useTable();
  return (
    <StyledRow columns={columns} role="row">
      {children}
    </StyledRow>
  );
};

const Body = <T,>({
  data,
  render,
}: {
  data: T[];
  render: (data: T) => ReactElement;
}) => {
  if (!data.length) return <Empty>No data to show at the moment.</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
