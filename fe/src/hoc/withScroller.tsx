import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { config } from "../config";

interface Props {
  loading: boolean,
  onLoadMore: (newLastIndex: number) => void;
}
export const withScroller = (Component: FC<any>) => {
  return (props: any) => {
    const [lastIndex, setLastIndex] = useState(0);

    const loadFunc = () => {
      if (!props.loading) {
        const newLastIndex = lastIndex + config.pageSize;
        setLastIndex(newLastIndex);
        props.onLoadMore(newLastIndex);
      }
    };

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={props.records?.length > 0}
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
