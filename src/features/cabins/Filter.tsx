import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active?: "false" | "active" }>`
  background-color: var(--color-grey-0);
  border: none;
  text-transform: capitalize;

  ${(props) =>
    props.$active === "active" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

FilterButton.defaultProps = {
  $active: "false",
};

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClicK = (value: string) => {
    searchParams.set("discount", value);
    setSearchParams(searchParams);
  };
  return (
    <StyledFilter>
      <FilterButton onClick={() => handleClicK("all")}>All</FilterButton>
      <FilterButton onClick={() => handleClicK("no-discount")}>
        No discount
      </FilterButton>
      <FilterButton onClick={() => handleClicK("with-discount")}>
        With Discount
      </FilterButton>
    </StyledFilter>
  );
};

export default Filter;
