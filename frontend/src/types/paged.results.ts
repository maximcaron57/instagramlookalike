export interface PagedResults<ResultType> {
  results: ResultType[];
  firstKey: string | null;
  lastKey: string | null;
  count: number;
}

export const initialPagedResults = {
  results: [],
  firstKey: null,
  lastKey: null,
  count: 0,
};
