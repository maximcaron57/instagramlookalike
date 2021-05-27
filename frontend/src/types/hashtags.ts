export interface Hashtag {
  name: string;
  count: number;
}

export interface HashtagQueryParams {
  like?: string;
  limit?: number;
  after?: string;
  orderBy?: string;
}
