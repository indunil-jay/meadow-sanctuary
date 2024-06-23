import Row from "../components/Row";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <h1>Update your account</h1>

      <Row type="vertical">
        <h3>Update user data</h3>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <h3>Update password</h3>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
