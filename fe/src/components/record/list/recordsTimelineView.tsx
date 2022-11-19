import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { withScroller } from "../../../hoc/withScroller";
import { FC } from "react";
import { Record } from "../../../types/Record";
import { getServiceType } from "../../../util/helper";

export interface Props {
  loading: boolean;
  records: Record[];
  onSelect: (Record: Record) => void;
  onEdit: (Record: Record) => void;
  onDelete: (Record: Record) => void;
  onLoadMore: (nextLimit: number) => void;
}

const RecordsTimelineView: FC<Props> = ({
  records,
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (records) {
    return (
      <Timeline position="alternate">
        {records.map((r) => (
          <TimelineItem key={r.id}>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              <TimelineDot color={getServiceType(r.type)?.color}>
                {/* <RepeatIcon /> */}
                {getServiceType(r.type)?.Icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: 2 }}>
              <Typography variant="h6" component="span">
                {getServiceType(r.type)?.label}
              </Typography>
              <Typography variant="subtitle1">
                {r.millage}km
              </Typography> 
              <Typography>{r.desc}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }
  return <div>Record Not found</div>;
};

export default withScroller(RecordsTimelineView);
