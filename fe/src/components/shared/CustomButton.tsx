import { Button } from "@mui/material";
import { FC } from "react";

interface Props {
  label: string;
  disabled: boolean;
  onClick: () => void;
}
export const CustomButton: FC<Props> = ({ label, onClick, disabled }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      color="primary"
      sx={{ mt: 3, mb: 2 }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
