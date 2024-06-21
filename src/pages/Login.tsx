import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../components/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  return (
    <LoginLayout>
      <Logo />
      <h3 style={{ textAlign: "center" }}>Log in to your account</h3>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
