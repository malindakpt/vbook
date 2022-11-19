import {
  Typography,
  CardMedia,
  CardHeader,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";
import { getServiceType } from "../../../util/helper";
interface Props {
  r: Record;
  loading: boolean;
  onEdit: (r: Record) => void;
  onDelete: (r: Record) => void;
}
export const RecordView: FC<Props> = ({ r, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ margin: 1 }} maxWidth="md">
      <CardHeader title={getServiceType(r.type)?.label} subheader={r.date} />
      {r.imageCount > 0 && (
        <CardMedia
          sx={{
            height: "300px",
          }}
          image={`${config.imageUrlPrefix}r-${r.id}-0.jpg?${r.updatedAt}`}
        />
      )}
      <CardContent>
        <Typography variant="body2">{`ODO Meter: ${r.millage}`}</Typography>
        <Typography variant="body2">ODO Meter: {r.millage}</Typography>
      </CardContent>

      <Button onClick={() => onEdit(r)}>Edit</Button>
      <Button onClick={() => onDelete(r)}>Delete</Button>
    </Box>
  );
};
