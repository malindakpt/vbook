import {
  Card,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FC } from "react";
import { config } from "../../../config";
import { Record } from "../../../types/Record";

// <div key={record.id}>
//                   <div  onClick={() => onSelect(record)}>{record.date}</div>
//                   <div>{record.desc}</div>
//                   <div>{record.millage}</div>
//                   <div>{record.type}</div>
//                   <div>Img count: {record.imageCount}</div>
//                   { record.imageCount > 0 && <img src={`${config.imageUrlPrefix}${record.id}-0.jpg`} alt="record"/>}
//                   <Button onClick={() => onEdit(record)}>Edit</Button>
//                   <Button onClick={() => onDelete(record)}>Delete</Button>
//                 </div>
interface Props {
  r: Record;
  onEdit: (r: Record) => void;
  onDelete: (r: Record) => void;
  onSelect: (Record: Record) => void;
}
export const RecordView: FC<Props> = ({ r, onSelect }) => {
  return (
    <Card raised sx={{ margin: 1 }} onClick={() => onSelect(r)}>
      <Typography variant="h5">{r.date}</Typography>
      <Typography variant="subtitle1">{r.date}</Typography>
      {r.imageCount > 0 && (
        <CardMedia
          sx={{
            height: "150px",
          }}
          image={`${config.imageUrlPrefix}${r.id}-0.jpg`}
        />
      )}
      <Typography variant="caption">ODO Meter: {r.millage}</Typography>
      {/* <CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label="View">
            <EditIcon />
          </IconButton>
        </CardActions>
      </CardActionArea> */}
    </Card>
  );
};
