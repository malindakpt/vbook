export const hasNextPage = (activePageNo: number, pageSize: number, totalResults: number) => {
  return activePageNo * pageSize < totalResults;
};
