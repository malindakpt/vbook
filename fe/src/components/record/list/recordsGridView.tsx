import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { withScroller } from "../../../hoc/withScroller";
import { FC } from "react";
import { Record } from "../../../types/Record";
import { config } from "../../../config";
import { getServiceType } from "../../../util/helper";

export interface RecordsList {
  loading: boolean;
  records: Record[];
  onSelect: (Record: Record) => void;
  onEdit: (Record: Record) => void;
  onDelete: (Record: Record) => void;
  onLoadMore: (nextLimit: number) => void;
}
const RecordsGridView: FC<RecordsList> = ({
  records,
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (records) {
    return (
      <Grid container spacing={2} rowSpacing={4}>
        {records.map((r) => (
          <Grid key={r.id} xs={12} sm={6} item>
            <Box sx={{ margin: 0 }} onClick={() => onSelect(r)}>
              <CardHeader
                title={getServiceType(r.type)?.label}
                subheader={r.date}
              />
              {r.imageCount > 0 && (
                <CardMedia
                  sx={{
                    height: "200px",
                  }}
                  image={`${config.imageUrlPrefix}r-${r.id}-0.jpg?${r.updatedAt}`}
                />
              )}
              <CardContent>
                <Typography variant="body2">{`ODO Meter: ${r.millage}`}</Typography>
                <Typography variant="body2">Description: {r.desc}</Typography>
              </CardContent>

              <Divider variant="middle" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }
  return <div>Record Not found</div>;
};

export default withScroller(RecordsGridView);
