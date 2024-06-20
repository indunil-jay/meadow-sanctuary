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

type Props = {
  filterValue: string;
  options: { value: string; label: string }[];
};

const Filter = ({ filterValue, options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  //addd url params
  const handleClicK = (value: string) => {
    searchParams.set(filterValue, value);
    setSearchParams(searchParams);
  };

  const currentFilter = searchParams.get(filterValue) || options[0].value;

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClicK(option.value)}
          key={option.value}
          $active={currentFilter === option.value ? "active" : "false"}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
