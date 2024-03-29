import { TextField } from "@mui/material";
import { FC } from "react";
import { Validators } from "../../util/validators";

interface Props {
  name: string;
  value: string;
  label: string;
  type?: string;
  multiline?: boolean;
  disabled: boolean;
  onChange: (key: string, value: number | string) => void;
}
export const TextInput: FC<Props> = ({
  name,
  value,
  label,
  onChange,
  disabled,
  multiline,
  type
}) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      margin="normal"
      required
      fullWidth
      type = {type}
      multiline={multiline}
      label={label}
      autoComplete="off"
      error={!Validators.text(value)}
      disabled={disabled}
      variant="standard"
    />
  );
};
