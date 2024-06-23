import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";
import useLogout from "./hooks/useLogout";
import SpinnerMini from "../../components/SpinnerMini";
import { FormEvent } from "react";

const Logout = () => {
  const { isLogouting, logoutFn } = useLogout();

  const handleLogoutClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutFn();
  };
  return (
    <ButtonIcon disabled={isLogouting} onClick={handleLogoutClick}>
      {isLogouting ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
