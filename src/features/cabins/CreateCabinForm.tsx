import styled from "styled-components";
import Input from "../../components/forms/Input";
import Form from "../../components/forms/Form";
import { Textarea } from "../../components/forms/Textarea";
import FileInput from "../../components/forms/FileInput";
import Button from "../../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCabin, createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../components/forms/FormRow";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

type CreateCabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
};

const CreateCabinForm = () => {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CreateCabinFormData>();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmitForm: SubmitHandler<CreateCabinFormData> = (data) => {
    // TODO:image
    const newCabin: Omit<TCabin, "id" | "created_at" | "image"> = {
      name: data.name,
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      description: data.description,
    };

    mutate(newCabin as TCabin);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", { required: "This Filed is Required." })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Filed is Required.",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Filed is Required.",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Filed is Required.",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for cabin"
        error={errors.description?.message}
      >
        <Textarea
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", { required: "This Filed is Required." })}
        />
      </FormRow>

      <StyledFormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </StyledFormRow>

      <StyledFormRow>
        <Button disabled={isCreating} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </StyledFormRow>
    </Form>
  );
};

export default CreateCabinForm;
