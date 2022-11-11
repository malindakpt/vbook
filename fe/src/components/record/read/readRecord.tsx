import { Button, Container, Grid } from "@mui/material";
import { FC } from "react";
import { Record } from "../../../types/Record";

interface Props {
  record: Record;
  loading: boolean;
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
}
export const ReadRecord: FC<Props> = ({ loading, record, onEdit, onDelete }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (record) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={12} sm={8} md={6} item>
            <div>{record.desc}</div>
            <div>{record.millage}</div>
            <Button onClick={() => onEdit(record)}>Edit</Button>
            <Button onClick={() => onDelete(record)}>Delete</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Record Not found</div>
};
