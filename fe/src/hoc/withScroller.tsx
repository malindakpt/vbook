import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { config } from "../config";
import { Record } from "../types/Record";

interface Props {
  hasMore: boolean;
  records: Record[];
  loading: boolean;
  onLoadMore: (nextLimit: number) => void;
}
export const withScroller = <T extends Props>(Component: FC<T>) => {
  return (props: T) => {
    const { records, hasMore } = props;

    // const [prevReceivedData, setPreReceivedvData] = useState<Record[]>([]);
    // const [mergedData, setMergedData] = useState<Record[]>([]);

    // const isNewDataReceived =
    //   records?.length > 0 &&
    //   (prevReceivedData.length === 0 ? true : prevReceivedData[0].id !== records[0].id);

    // if (isNewDataReceived) {
    //   const allData = [...mergedData, ...records];
    //   setMergedData(allData);
    //   setPreReceivedvData(records);
    // }

    const loadFunc = () => {
      if (!props.loading) {
        const newLastIndex = records.length + config.pageSize;
        props.onLoadMore(newLastIndex);
      }
    };

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={<div key={0}>Loading ...</div>}
      >
        <Component {...{ ...props }} />
      </InfiniteScroll>
    );
  };
};
