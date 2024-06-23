import { useForm } from "react-hook-form";
import Form from "../../components/forms/Form";
import FormRow from "../../components/forms/FormRow";
import Input from "../../components/forms/Input";
import Button from "../../components/ui/Button";
import useUpdatePassword from "./hooks/useUpdatePassword";

type TPasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<TPasswordFormData>();

  const { errors } = formState;

  const { isPasswordUpdating, updatePasswordFn } = useUpdatePassword();

  const onSubmit = (data: TPasswordFormData) => {
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword)
      return;
    updatePasswordFn(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      { onSettled: () => reset() }
    );
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password"
        error={errors?.currentPassword?.message}
      >
        <Input
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          disabled={isPasswordUpdating}
          {...register("currentPassword", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.newPassword?.message}
      >
        <Input
          type="password"
          id="newPassword"
          autoComplete="new-password"
          disabled={isPasswordUpdating}
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm New Password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          disabled={isPasswordUpdating}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              getValues().newPassword === value || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button onClick={handleReset} type="reset" $variation="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isPasswordUpdating}>
            Update Password
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
