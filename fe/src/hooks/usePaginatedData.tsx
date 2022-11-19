import { useState } from "react";
import { Record } from "../types/Record";

export const usePaginatedData = (data: Record[]) => {
  const [prevReceivedData, setPreReceivedvData] = useState<Record[]>([]);
  const [mergedData, setMergedData] = useState<Record[]>([]);

  const isNewDataReceived =
    data?.length > 0 &&
    (prevReceivedData.length === 0
      ? true
      : prevReceivedData[0].id !== data[0].id);

  if (isNewDataReceived) {
    const allData = [...mergedData, ...data];
    setMergedData(allData);
    setPreReceivedvData(data);
  }

  return mergedData;
};
