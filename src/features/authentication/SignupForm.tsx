import { useForm } from "react-hook-form";
import useSignUp from "./hooks/useSignUp";
import FormRow from "../../components/forms/FormRow";
import Input from "../../components/forms/Input";
import Button from "../../components/ui/Button";
import Form from "../../components/forms/Form";

export type TSignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupForm = () => {
  const { isSigningUp, signupFn } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<TSignUpFormData>();
  const { errors } = formState;

  const onSubmit = ({ fullName, email, password }: TSignUpFormData) => {
    signupFn(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button $variation="secondary" type="reset" disabled={isSigningUp}>
            Cancel
          </Button>
          <Button disabled={isSigningUp}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
