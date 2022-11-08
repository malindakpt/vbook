import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";
import { Validators } from "../../util/validators";

interface Props {
  name: string;
  value: number;
  label: string;
  disabled: boolean;
  options: Array<{ id: number; label: string }>;
  onChange: (key: string, value: number | string) => void;
}
const vehicleTypes = [
  { label: "-Select vehicle type-", id: 0 },
  { label: "Car", id: 1, src: "car.png" },
  { label: "Bus", id: 2, src: "bus.png" },
];

export const AutoInputImage: FC<Props> = ({
  name,
  value,
  label,
  options,
  onChange,
}) => {
  const selectedValue = vehicleTypes.find((ele) => ele.id === value);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selectedValue}
      options={vehicleTypes}
      fullWidth
      renderOption={(_params, option, state) => (
        <div
          onClick={() => {
            console.log(state);
            return option && onChange("type", option.id);
          }}
          key={option.id}
        >
          {option.label}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          error={!Validators.autoInput(value)}
          {...params}
          label={label}
        />
      )}
      // onChange={(_e, value) => value && onChange(name, value.id)}
    />
  );
};
