import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const LogoText = styled.span`
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 600;
  line-height: 1;
  pointer-events: none;
`;

function Logo() {
  return (
    <StyledLogo>
      <LogoText>Meadow Sanctuary</LogoText>
    </StyledLogo>
  );
}

export default Logo;
