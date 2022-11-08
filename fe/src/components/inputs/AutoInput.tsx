import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";

interface Props {
  name: string;
  value: number;
  label: string;
  disabled: boolean;
  options: Array<{ id: number; label: string }>;
  onChange: (key: string, value: number | string) => void;
}
export const AutoInput: FC<Props> = ({
  name,
  value,
  label,
  options,
  onChange,
}) => {
  const selectedValue =  options.find((ele) => ele.id === value);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selectedValue}
      options={options}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_e, value) => value && onChange(name, value.id)}
    />
  );
};
