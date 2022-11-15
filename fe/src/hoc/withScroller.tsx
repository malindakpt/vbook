import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ListRecordsProps } from "../components/record/list/listRecords";
import { config } from "../config";

export const withScroller = (Component: any) => {
  return (props: ListRecordsProps) => {
    const [lastIndex, setLastIndex] = useState(0);

    const loadFunc = () => {
      if (!props.loading) {
        const newLastIndex = lastIndex + config.pageSize;
        setLastIndex(newLastIndex);
        // fetchDataAction(newLastIndex);

        props.onLoadMore(newLastIndex);
        console.log("reqesting....", newLastIndex);
      }
    };

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div  key={0}>
            Loading ...
          </div>
        }
      >
        <Component {...props} />
      </InfiniteScroll>
    );
  };
};
