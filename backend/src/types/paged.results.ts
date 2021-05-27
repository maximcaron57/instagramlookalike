export interface PagedResults<ResultType> {
  results: ResultType[];
  firstKey: string | null;
  lastKey: string | null;
  count: number;
}
