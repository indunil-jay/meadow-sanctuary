import { ChangeEvent, ReactElement } from "react";
import styled from "styled-components";

const StyledSelect = styled.select<{ type?: "white" }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type Props<T> = {
  type?: "white";
  value: string;
  options: T[];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  render: (data: T) => ReactElement;
};

const Select = <T,>({
  options,
  value,
  type,
  handleChange,
  render,
}: Props<T>) => {
  return (
    <StyledSelect value={value} type={type} onChange={handleChange}>
      {options.map(render)}
    </StyledSelect>
  );
};

export default Select;
