import { Button, Container, Grid } from "@mui/material";
import { withScroller } from '../../../hoc/withScroller';
import { FC } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";

export interface ListRecordsProps {
  loading: boolean;
  records: Record[];
  onSelect: (Record: Record) => void;
  onEdit: (Record: Record) => void;
  onDelete: (Record: Record) => void;
  onLoadMore: (nextLimit: number) => void;
}
const ListRecords: FC<ListRecordsProps> = ({ records, onSelect, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!records || records.length === 0) {
    return <div>No Records</div>;
  }

  if (records) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={12} sm={8} md={6} item>
            {records.map((record) => {
              return (
                <div key={record.id}>
                  <div  onClick={() => onSelect(record)}>{record.date}</div>
                  <div>{record.desc}</div>
                  <div>{record.millage}</div>
                  <div>{record.type}</div>
                  <div>Img count: {record.imageCount}</div>
                  { record.imageCount > 0 && <img src={`${config.imageUrlPrefix}${record.id}-0.jpg`} alt="record"/>}
                  <Button onClick={() => onEdit(record)}>Edit</Button>
                  <Button onClick={() => onDelete(record)}>Delete</Button>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Record Not found</div>;
};

export default withScroller(ListRecords);