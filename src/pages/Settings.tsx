import Row from "../components/ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const Settings = () => {
  return (
    <Row type="vertical">
      <h1>Update the Hotel Settings</h1>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
