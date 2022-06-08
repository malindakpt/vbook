import React, { useState } from 'react';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Props } from '../../ArtistSearch/ArtistSearch';
import { hasNextPage } from './withScrollUtil';
// import { Loader } from '../../presentational/Loader/Loader';

export interface DataApiArgs extends FetchArgs {
  params: any;
}

export const withScroll = (Wrapped: React.FC<Props>, useData: any) => {
  const ScrollableComponent = () => {
    let hasNext = false;
    const [ready, setReady] = useState(true);
    const [baseQueryParams, setBaseQueryParams] = useState<DataApiArgs>({
      url: '',
      params: { page: 1, limit: 50 }
    });

    const { data, isFetching } = useData(ready ? baseQueryParams : undefined);

    const loadMore = (): void => {
      setBaseQueryParams((prev) => {
        const next = { ...prev };
        next.params = { ...prev.params, prevData: data.arr };
        if (next.params) {
          next.params.page = next.params.page + 1;
        }
        return next;
      });
    };

    const handleQueryParamChange = (qParam: any) => {
      setBaseQueryParams((prev) => {
        const next = { ...prev };
        next.params = { ...prev.params, ...qParam, prevData: [] };
        return next;
      });
      setReady(true);
    };

    hasNext = hasNextPage(
      baseQueryParams.params.page,
      baseQueryParams.params.limit,
      data?.totalSize ?? 0
    );

    const [sentryRef] = useInfiniteScroll({
      loading: isFetching,
      hasNextPage: hasNext,
      onLoadMore: loadMore,
      // When there is an error, we stop infinite loading.
      // It can be reactivated by setting "error" state as undefined.
      disabled: false,
      // `rootMargin` is passed to `IntersectionObserver`.
      // We can use it to trigger 'onLoadMore' when the sentry comes near to become
      // visible, instead of becoming fully visible on the screen.
      rootMargin: '0px 0px 400px 0px'
    });

    return (
      <>
        <Wrapped data={data?.arr} onQueryParamChange={handleQueryParamChange}></Wrapped>
        {(isFetching || hasNext) && (
          <div ref={sentryRef}>
            <div>Loader</div>
          </div>
        )}
      </>
    );
  };
  return ScrollableComponent;
};
