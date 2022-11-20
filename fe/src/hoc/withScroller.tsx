import { FC } from "react";
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
