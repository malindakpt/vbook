import { TextField } from "@mui/material";
import { FC } from "react";

interface Props {
  name: string;
  value: number;
  label: string;
  disabled: boolean;
  onChange: (key: string, value: number | string) => void;
}
export const DateInput: FC<Props> = ({
  name,
  value,
  label,
  onChange,
  disabled,
}) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      id="date"
      label={label}
      type="date"
      defaultValue="2017-05-24"
      InputLabelProps={{
        shrink: true,
      }}
      disabled={disabled}
    />
  );
};
