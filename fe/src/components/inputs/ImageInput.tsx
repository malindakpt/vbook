import { TextField } from "@mui/material";
import { FC } from "react";
import Resizer from "react-image-file-resizer";
import { config } from "../../config";

interface Props {
  onImageSelected: (base64: Blob) => void;
}
export const ImageInput: FC<Props> = ({ onImageSelected }) => {
  const fileChangedHandler = (event: any) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          config.maxDimentionsForImageUpload,
          config.maxDimentionsForImageUpload,
          "JPEG",
          100,
          0,
          (uri) => {
            onImageSelected(uri as Blob);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  return  <TextField
  onChange={fileChangedHandler}
  margin="normal"
  required
  fullWidth
  autoComplete="off"
  type="file"
/>
};
