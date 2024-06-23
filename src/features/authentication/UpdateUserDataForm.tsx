import FormRow from "../../components/forms/FormRow";
import Input from "../../components/forms/Input";
import FileInput from "../../components/forms/FileInput";
import Button from "../../components/ui/Button";
import Form from "../../components/forms/Form";
import useUser from "./hooks/useUser";
import { FormEvent, useState } from "react";
import { useUpdateCurrentUser } from "./hooks/useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();
  const { fullName: currentFullName, avatar } = user!.user_metadata;
  const [fullName, setFullName] = useState(currentFullName);
  const [image, setImage] = useState<File | null>(avatar);
  const { isUpdatingUser, updateCurrentUserFn } = useUpdateCurrentUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;
    updateCurrentUserFn({ fullName, avatar: image });
  };

  const handleCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFullName(currentFullName);
    setImage(avatar);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input disabled value={user?.email} />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdatingUser}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          disabled={isUpdatingUser}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            type="reset"
            $variation="secondary"
            disabled={isUpdatingUser}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdatingUser}>
            Update account
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
