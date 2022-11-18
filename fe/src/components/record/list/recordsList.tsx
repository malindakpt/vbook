import { Button, Container, Grid } from "@mui/material";
import { withScroller } from "../../../hoc/withScroller";
import { FC, useEffect, useState } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";
import { RecordView } from "./recordGridView";

export interface ListRecordsProps {
  loading: boolean;
  records: Record[];
  onSelect: (Record: Record) => void;
  onEdit: (Record: Record) => void;
  onDelete: (Record: Record) => void;
  onLoadMore: (nextLimit: number) => void;
}
const ListRecords: FC<ListRecordsProps> = ({
  records,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [hasMore, setHasMore] = useState(true);
  const [mergedData, setMergedData] = useState<Record[]>([]);
  const [prevData, setPrevData] = useState<Record[]>([]);

  if (hasMore && records && records.length === 0) {
    setHasMore(false);
  }

  useEffect(() => {
    console.log("mkpt mounted");
    return () => {
      console.log("mkpt unmounted");
    };
  }, []);

  // TODO: Refactor this logic
  if (
    records &&
    records.length > 0 &&
    (prevData.length === 0 ? true : prevData[0].id !== records[0].id)
  ) {
    const allData = [...mergedData, ...records];
    setMergedData(allData);
    setPrevData(records);
  }

  if (records) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          {mergedData.map((record) => (
            <Grid key={record.id} xs={12} sm={6} md={4} item>
              <RecordView
                r={record}
                onSelect={onSelect}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  return <div>Record Not found</div>;
};

export default withScroller(ListRecords);
