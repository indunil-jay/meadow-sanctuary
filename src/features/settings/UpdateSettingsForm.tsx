import { ChangeEvent } from "react";
import Form from "../../components/forms/Form";
import FormRow from "../../components/forms/FormRow";
import Input from "../../components/forms/Input";
import Spinner from "../../components/Spinner";
import useGetSettings from "./hooks/useGetSettings";
import useUpdateSetting from "./hooks/useUpdateSetting";

const UpdateSettingsForm = () => {
  const { isSettingDataError, isSettingDataLoading, settings } =
    useGetSettings();
  const { isUpdatingSetting, updateSettingFn } = useUpdateSetting();

  if (isSettingDataLoading || isUpdatingSetting) return <Spinner />;

  if (isSettingDataError) return <p>Something went wrong</p>;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings!;

  const handleUpdateSetting = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (!e.target.value || !fieldName) return;
    console.log(e.target.value);

    updateSettingFn({ [fieldName]: e.target.value });
  };

  //TODO:maxGuestsPerBookin need to be calculted dynamically

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdatingSetting}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdatingSetting}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSetting}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSetting}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
