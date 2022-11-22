import { TextField } from "@mui/material";
import { FC } from "react";

interface Props {
  name: string;
  value: string;
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

  const parsedDate = value.split('T')[0];
  return (
    <TextField
      value={parsedDate}
      onChange={(e) => onChange(name, e.target.value)}
      id="date"
      label={label}
      fullWidth
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      disabled={disabled}
    />
  );
};
