import Row from "../components/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <h1>Update your account</h1>

      <Row>
        <h3>Update user data</h3>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <h3>Update password</h3>
      </Row>
    </>
  );
}

export default Account;
