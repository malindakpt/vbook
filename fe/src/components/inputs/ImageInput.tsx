import { TextField } from "@mui/material";
import { FC, useState } from "react";
import Resizer from "react-image-file-resizer";
import { config } from "../../config";

interface Props {
  onImageSelected: (base64: Blob) => void;
}
export const ImageInput: FC<Props> = ({ onImageSelected }) => {
  const [img, setImg] = useState<string>();

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
            setImg(uri as string);
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
  return (
    <div>
      <TextField
        onChange={fileChangedHandler}
        margin="normal"
        required
        fullWidth
        autoComplete="off"
        type="file"
      />
      {img && <img alt="preview" height={"100px"} src={img} />}
    </div>
  );
};
