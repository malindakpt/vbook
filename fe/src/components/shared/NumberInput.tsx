import { TextField } from "@mui/material";
import { FC } from "react";
import { Validators } from "../../util/validators";

interface Props {
  name: string;
  value: number;
  label: string;
  disabled: boolean;
  onChange: (key: string, value: number | string) => void;
}
export const NumberInput: FC<Props> = ({
  name,
  value,
  label,
  disabled,
  onChange,
}) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      margin="normal"
      type="number"
      required
      fullWidth
      label={label}
      autoComplete="off"
      error={!Validators.number(value)}
      disabled={disabled}
    />
  );
};
