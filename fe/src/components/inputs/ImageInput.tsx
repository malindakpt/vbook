import { BlobServiceClient } from "@azure/storage-blob";
import { Button } from "@mui/material";
import { FC, useState } from "react";
import Resizer from "react-image-file-resizer";

interface Props {
  onImageSelected: (base64:  Blob ) => void;
}
export const ImageInput: FC<Props> = ({onImageSelected}) => {
  // const blobSasUrl =
  //   "https://vbookimages.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-12-09T21:14:33Z&st=2022-11-13T13:14:33Z&spr=https,http&sig=NLukG2RjVFLRgVTnXNA8%2ByM%2B9fxdA9xQWJ66scgs%2B7I%3D";
  // // Create a new BlobServiceClient
  // const blobServiceClient = new BlobServiceClient(blobSasUrl);

  // // Create a unique name for the container by
  // // appending the current time to the file name
  // const containerName = "newcontainer";

  // // Get a container client from the BlobServiceClient
  // const containerClient = blobServiceClient.getContainerClient(containerName);

  // const uploadBlob = async (e: any) => {
  //   const files = e.target.files;
  //   console.log(files);
  //   try {
  //     console.log("Uploading files...");
  //     const promises = [];
  //     for (const file of files) {
  //       const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  //       promises.push(blockBlobClient.uploadBrowserData(file));
  //     }
  //     await Promise.all(promises);
  //     console.log("Done.");
  //     listFiles();
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // const uploadFile = async (file: File) => {
  //   console.log(file);
  //   try {
  //     console.log("Uploading files...");

  //     const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  //     blockBlobClient.uploadBrowserData(file);

  //     console.log("Done.");
  //     listFiles();
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // const dataURLtoFile = (dataurl: string, filename: string) => {
  //   const arr = dataurl.split(",");

  //   // @ts-ignore
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   let u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   const file = new File([u8arr], filename, { type: mime });
  //   return file;
  // };

  // const listFiles = async () => {
  //   // fileList.size = 0;
  //   // fileList.innerHTML = "";
  //   try {
  //     console.log("Retrieving file list...");
  //     let iter = containerClient.listBlobsFlat();
  //     let blobItem = await iter.next();
  //     while (!blobItem.done) {
  //       // fileList.size += 1;
  //       // fileList.innerHTML += `<option>${blobItem.value.name}</option>`;
  //       console.log(blobItem.value.name);

  //       blobItem = await iter.next();
  //     }
  //     // if (fileList.size > 0) {
  //     //     console.log("Done.");
  //     // } else {
  //     //     reportStatus("The container does not contain any files.");
  //     // }
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // const [state, setState] = useState<any>();
  const fileChangedHandler = (event: any) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          700,
          700,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            onImageSelected(uri as Blob);
            // setState({ newImage: uri });
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

  // const uploadResized = () => {
  //   // uploadBlob1("rr", state.newImage);
  //   dataURLtoFile(state.newImage, "mf2.jpg");
  // };

  return (
    <div>
      {/* <input onChange={uploadBlob} type={"file"} />
      <Button onClick={listFiles}>List files</Button> */}
      <input onChange={fileChangedHandler} type={"file"} />
      {/* <Button onClick={uploadResized}>Upload Resized</Button> */}
    </div>
  );
};
