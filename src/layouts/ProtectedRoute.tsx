import { ReactNode, useEffect } from "react";
import useUser from "../features/authentication/hooks/useUser";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  //load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/signin", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  //show a spinner;
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //if no user  redirect to login page

  //give acceess to app
  return isAuthenticated && children;
};

export default ProtectedRoute;
