import {
  Card,
  Typography,
  CardMedia,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";
import { getServiceTypeLabel } from "../../../util/helper";
interface Props {
  r: Record;
  loading: boolean;
  onEdit: (r: Record) => void;
  onDelete: (r: Record) => void;
}
export const RecordDetailedView: FC<Props> = ({
  r,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader title={getServiceTypeLabel(r.type)} subheader={r.date} />
      {r.imageCount > 0 && (
        <CardMedia
          sx={{
            height: "200px",
          }}
          image={`${config.imageUrlPrefix}${r.id}-0.jpg`}
        />
      )}
      <CardContent>
        <Typography variant="body2">{`ODO Meter: ${r.millage}`}</Typography>
        <Typography variant="body2">ODO Meter: {r.millage}</Typography>
      </CardContent>

      <Button onClick={() => onEdit(r)}>Edit</Button>
      <Button onClick={() => onDelete(r)}>Delete</Button>
    </Card>
  );
};
