import {
  Typography,
  CardMedia,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";
import { getServiceTypeLabel } from "../../../util/helper";
interface Props {
  r: Record;
  onSelect: (Record: Record) => void;
}
export const RecordGridView: FC<Props> = ({ r, onSelect }) => {
  return (
    <Box sx={{ margin: 0 }} onClick={() => onSelect(r)}>
      <CardHeader title={getServiceTypeLabel(r.type)} subheader={r.date} />
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
        <Typography variant="body2">ODO Meter: {r.millage}</Typography>
      </CardContent>
    </Box>
  );
};
