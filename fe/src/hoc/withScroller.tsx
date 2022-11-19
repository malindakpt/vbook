import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { config } from "../config";
import { Record } from "../types/Record";

interface Props {
  records: Record[];
  loading: boolean;
  onLoadMore: (nextLimit: number) => void;
}
export const withScroller = <T extends Props>(Component: FC<T>) => {
  return (props: T) => {
    const { records } = props;

    const [prevReceivedData, setPreReceivedvData] = useState<Record[]>([]);
    const [mergedData, setMergedData] = useState<Record[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastIndex, setLastIndex] = useState(0);

    if (hasMore && records && records.length === 0) {
      setHasMore(false);
    }

    const isNewDataReceived =
      records?.length > 0 &&
      (prevReceivedData.length === 0 ? true : prevReceivedData[0].id !== records[0].id);

    if (isNewDataReceived) {
      const allData = [...mergedData, ...records];
      setMergedData(allData);
      setPreReceivedvData(records);
    }

    const loadFunc = () => {
      if (!props.loading) {
        const newLastIndex = lastIndex + config.pageSize;
        setLastIndex(newLastIndex);
        props.onLoadMore(newLastIndex);
        console.log("loading upto ", newLastIndex);
      }
    };

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={props.records?.length > 0}
        loader={<div key={0}>Loading ...</div>}
      >
        <Component {...{ ...props, records: mergedData }} />
      </InfiniteScroll>
    );
  };
};
