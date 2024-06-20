import styled, { css } from "styled-components";

type RowType = {
  type?: "horizontal" | "vertical";
};

const Row = styled.div<RowType>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 1.6rem;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "horizontal",
};

export default Row;
