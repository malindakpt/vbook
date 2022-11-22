import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";
import { Validators } from "../../util/validators";

interface Props {
  name: string;
  value: number;
  label: string;
  disabled: boolean;
  options: Array<{ id: number; label: string; src?: string }>;
  onChange: (key: string, value: number | string) => void;
}


export const AutoInputImage: FC<Props> = ({
  name,
  value,
  label,
  options,
  onChange,
}) => {
  const selectedValue = options.find((ele) => ele.id === value);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selectedValue}
      options={options}
      fullWidth
      renderOption={(props, option) => (
        <li
        {...props}
          key={option.id}
        >
       
         { option.src && <img  alt="123" src={option.src} />}
            
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          error={!Validators.autoInput(value)}
          {...params}
          label={label}
        />
      )}
      onChange={(_e, value) => value && onChange(name, value.id)}
    />
  );
};
