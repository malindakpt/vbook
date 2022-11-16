import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";
import {
  useDeleteRecordMutation,
  useReadRecordsQuery,
} from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import ListRecords from "./listRecords";

export const ListRecordsContainer = () => {
  let { vid } = useParams(); // incase if we need to view Records of other owner
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);

  const handleLoadMore = (nextLimit: number) => {
    setQuery(prev => {
      const next = {...prev, limit: config.pageSize, offset: nextLimit};
      return next;
    })
  }
  const searchQuery = vid
    ? { UserId: user?.id, VehicleId: Number(vid) }
    : { UserId: user?.id };

   const [query, setQuery] = useState({...searchQuery, limit: config.pageSize, offset: config.pageSize}) 

  const { data, error, isFetching, isLoading } = useReadRecordsQuery(query);

  const [mergedData, setMergedData] = useState<Record[]>([]);
  const [prevData, setPrevData] = useState<Record[]>([]);

  if(data && data.length>0 && (prevData.length === 0 ? true :  prevData[0].id !== data[0].id)){
    const allData = [...mergedData, ...data];
    setMergedData(allData);
    setPrevData(data);
  }

  const [deleteRecord, result] = useDeleteRecordMutation();

  console.log('isfetching', isFetching);
  console.log('isLoading', isLoading);

  const handleSelect = (v: Record) => {
    navigate(`/record/${v.id}`);
  };

  const handleEdit = (r: Record) => {
    navigate(`/record/update/${r.id}`);
  };

  const handleDelete = async (r: Record) => {
    if (r?.id) {
      await deleteRecord(r.id);
    }
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  return (
    <ListRecords
      onSelect={handleSelect}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={isFetching}
      records={mergedData}
      onLoadMore={handleLoadMore}
    />
  );
};
