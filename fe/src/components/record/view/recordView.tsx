import {
  Card,
  Typography,
  CardMedia,
  CardHeader,
  CardContent,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";
import { getServiceTypeLabel } from "../../../util/helper";
interface Props {
  r: Record;
  onEdit: (r: Record) => void;
  onDelete: (r: Record) => void;
  onSelect: (Record: Record) => void;
}
export const RecordView: FC<Props> = ({ r, onSelect }) => {
  return (
    <Card sx={{ margin: 1 }} onClick={() => onSelect(r)}>
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
    </Card>
  );
};
