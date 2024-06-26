import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type Props = {
  options: { value: string; label: string }[];
};
const Sort = ({ options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  const currentSearchValue = searchParams.get("sort") || "";

  return (
    <Select
      options={options}
      type="white"
      handleChange={handleChange}
      value={currentSearchValue}
      render={(option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      )}
    />
  );
};

export default Sort;
