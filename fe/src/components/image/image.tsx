import { useState } from "react";
import Resizer from "react-image-file-resizer";

export const Image = () => {
  const [state, setState] = useState<any>();
  const fileChangedHandler = (event: any) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            setState({ newImage: uri });
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

  return <input type="file" onChange={fileChangedHandler}/>;
};
