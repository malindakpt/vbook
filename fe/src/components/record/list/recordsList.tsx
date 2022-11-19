import { Container, Grid } from "@mui/material";
import { withScroller } from "../../../hoc/withScroller";
import { FC } from "react";
import { Record } from "../../../types/Record";
import { RecordGridView } from "./recordGridView";

export interface RecordsList {
  loading: boolean;
  records: Record[];
  onSelect: (Record: Record) => void;
  onEdit: (Record: Record) => void;
  onDelete: (Record: Record) => void;
  onLoadMore: (nextLimit: number) => void;
}
const ListRecords: FC<RecordsList> = ({
  records,
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (records) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          {records.map((record) => (
            <RecordGridView key={record.id} r={record} onSelect={onSelect} />
          ))}
        </Grid>
      </Container>
    );
  }
  return <div>Record Not found</div>;
};

export default withScroller(ListRecords);
