import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../../components/forms/Input";
import Form from "../../components/forms/Form";
import { Textarea } from "../../components/forms/Textarea";
import FileInput from "../../components/forms/FileInput";
import Button from "../../components/ui/Button";
import FormRow from "../../components/forms/FormRow";
import Row from "../../components/ui/Row";
import { TCabin } from "../../services/apiCabins";
import useCreateCabin from "./hooks/useCreateCabin";
import useUpdateCabin from "./hooks/useUpdateCabin";

export type TCabinFormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string;
};

type CabinFromType<T extends boolean> = T extends true
  ? Partial<TCabinFormData>
  : TCabinFormData;

type Props = {
  currentCabin?: TCabin;
  onCloseModal?: () => void;
};

const CabinForm = ({ currentCabin, onCloseModal }: Props) => {
  const isUpdateSession = Boolean(currentCabin?.id);
  const { createNewCabinFn, isCreating } = useCreateCabin();
  const { isUpdating, updateCabinfn } = useUpdateCabin();

  const { register, handleSubmit, getValues, reset, formState } =
    useForm<TCabinFormData>({
      defaultValues: isUpdateSession
        ? {
            name: currentCabin?.name,
            maxCapacity: currentCabin?.maxCapacity,
            regularPrice: currentCabin?.regularPrice,
            discount: currentCabin?.discount,
            description: currentCabin?.description,
            image: currentCabin?.image,
          }
        : {},
    });

  const { errors } = formState;
  const isCreatingOrUpdating = isCreating || isUpdating;

  const onSubmitForm: SubmitHandler<TCabinFormData> = (data) => {
    const newCabin: CabinFromType<typeof isUpdateSession> = {
      name: data.name,
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount) || 0,
      description: data.description,
      image:
        data.image instanceof FileList ? data.image[0] : currentCabin?.image,
    };

    if (isUpdateSession && currentCabin) {
      updateCabinfn(
        {
          cabin: newCabin as Partial<TCabinFormData>,
          id: currentCabin.id,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createNewCabinFn(newCabin as TCabinFormData & { image: File }, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      type={onCloseModal !== undefined ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          disabled={isCreatingOrUpdating}
          type="text"
          id="name"
          {...register("name", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isCreatingOrUpdating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          disabled={isCreatingOrUpdating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required.",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          disabled={isCreatingOrUpdating}
          type="number"
          id="discount"
          {...register("discount", {
            validate: (value) => {
              if (
                value !== undefined &&
                Number(value) > Number(getValues().regularPrice)
              ) {
                return "Discount should be less than regular price.";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for cabin"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          disabled={isCreatingOrUpdating}
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: !isUpdateSession && "This field is required.",
          })}
        />
      </FormRow>

      <Row role="row">
        <Button
          disabled={isCreatingOrUpdating}
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingOrUpdating}>
          {isUpdateSession ? "Update Cabin" : "Add cabin"}
        </Button>
      </Row>
    </Form>
  );
};

export default CabinForm;
