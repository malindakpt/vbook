import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";
import { usePaginatedData } from "../../../hooks/usePaginatedData";
import {
  useDeleteRecordMutation,
  useReadRecordsQuery,
} from "../../../state/api/record.api";
import { useAppSelector } from "../../../state/store";
import { Record } from "../../../types/Record";
import { ErrorComponent } from "../../error/error";
import RecordsGridView from "./recordsGridView";
import RecordsTimelineView from "./recordsTimelineView";
import TimelineIcon from "@mui/icons-material/Timeline";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

export const RecordsListContainer = () => {
  let { vid } = useParams(); // incase if we need to view Records of other owner
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const handleLoadMore = (nextLimit: number) => {
    setQuery((prev) => {
      const next = { ...prev, limit: config.pageSize, offset: nextLimit };
      return next;
    });
  };
  const searchQuery = vid
    ? { UserId: user?.id, VehicleId: Number(vid) }
    : { UserId: user?.id };

  const [query, setQuery] = useState({
    ...searchQuery,
    limit: config.pageSize,
    offset: config.pageSize,
  });

  const [viewMode, setViewMode] = useState<"Timeline" | "Grid">("Timeline");

  const { data, error, isFetching, isLoading } = useReadRecordsQuery(query);

  const paginatedMergedData = usePaginatedData(data);

  const [deleteRecord, result] = useDeleteRecordMutation();

  const handleSelect = (v: Record) => {
    navigate(`/record/${v.id}`);
  };

  const handleEdit = (r: Record) => {
    navigate(`/record/update/${r.id}`);
  };

  const handleDelete = async (r: Record) => {
    if (r?.id) {
      await deleteRecord(r.id);
    }
  };

  if (!user) {
    return <ErrorComponent text="User N/A" />;
  }

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={viewMode}
        exclusive
        aria-label="Platform"
      >
        <ToggleButton value="Timeline" onClick={() => setViewMode("Timeline")}>
          <TimelineIcon />
        </ToggleButton>
        <ToggleButton value="Grid" onClick={() => setViewMode("Grid")}>
          <ViewQuiltIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      {viewMode === "Timeline" ? (
        <RecordsTimelineView
          hasMore={data?.length > 0}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={isFetching}
          records={paginatedMergedData}
          onLoadMore={handleLoadMore}
        />
      ) : (
        <RecordsGridView
          hasMore={data?.length > 0}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={isFetching}
          records={paginatedMergedData}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
};
