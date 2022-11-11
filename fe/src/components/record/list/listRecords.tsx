import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Record } from "../../../types/Record";

interface Props {
  loading: boolean;
  records: Record[];
  onSelect: (Record: Record) => void;
}
export const ListRecords: FC<Props> = ({ records, onSelect, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!records) {
    return <div>No Records</div>;
  }

  if (records) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={12} sm={8} md={6} item>
            {records.map((record) => {
              return (
                <div key={record.id} onClick={() => onSelect(record)}>
                  <div>{record.date}</div>
                  <div>{record.desc}</div>
                  <div>{record.millage}</div>
                  <div>{record.type}</div>
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
