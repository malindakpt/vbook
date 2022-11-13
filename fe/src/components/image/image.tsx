import { BlobServiceClient } from "@azure/storage-blob";
import { Button } from "@mui/material";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export const Image = () => {
  const blobSasUrl =
    "https://vbookimages.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2022-11-13T10:00:09Z&st=2022-11-13T02:00:09Z&spr=https,http&sig=vqVN5HHY11alCIn4beHLvao3MjtrlARmlr8xiALE79E%3D";

  // Create a new BlobServiceClient
  const blobServiceClient = new BlobServiceClient(blobSasUrl);

  // Create a unique name for the container by
  // appending the current time to the file name
  const containerName = "newcontainer";

  // Get a container client from the BlobServiceClient
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const uploadBlob = async (e: any) => {
    const files = e.target.files;
    console.log(files);
    try {
      console.log("Uploading files...");
      const promises = [];
      for (const file of files) {
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
      }
      await Promise.all(promises);
      console.log("Done.");
      listFiles();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const uploadBlob1 = async (fileName: string, blob: Blob) => {
    // const files = e.target.files;
    // console.log(files);
    try {
      console.log("Uploading files...");
      // const promises = [];
      // for (const file of files) {
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      // promises.push(blockBlobClient.uploadBrowserData(file));
      await blockBlobClient.uploadData(blob);
      // }
      // await Promise.all(promises);
      console.log("Done.");
      listFiles();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const listFiles = async () => {
    // fileList.size = 0;
    // fileList.innerHTML = "";
    try {
      console.log("Retrieving file list...");
      let iter = containerClient.listBlobsFlat();
      let blobItem = await iter.next();
      while (!blobItem.done) {
        // fileList.size += 1;
        // fileList.innerHTML += `<option>${blobItem.value.name}</option>`;
        console.log(blobItem.value.name);

        blobItem = await iter.next();
      }
      // if (fileList.size > 0) {
      //     console.log("Done.");
      // } else {
      //     reportStatus("The container does not contain any files.");
      // }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const createContainer = async () => {
    try {
      console.log(`Creating container "${containerName}"...`);
      await containerClient.create();
      console.log(`Done. URL:${containerClient.url}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const deleteContainer = async () => {
    try {
      console.log(`Deleting container "${containerName}"...`);
      await containerClient.delete();
      console.log(`Done.`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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

  const uploadResized = () => {
    uploadBlob1('rr', state.newImage);
  }

  return (
    <div>
      <input onChange={uploadBlob} type={"file"} />
      <Button onClick={listFiles}>List files</Button> 
      <input onChange={fileChangedHandler} type={"file"} />
      <Button onClick={uploadResized}>Upload Resized</Button>
    </div>
  );
};
