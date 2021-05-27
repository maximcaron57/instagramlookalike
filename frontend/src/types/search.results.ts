import { SimpleUser } from './users';
import { Hashtag } from './hashtags';

export interface SearchResults {
  users: SimpleUser[];
  hashtags: Hashtag[];
  descriptionCount: number;
}

export const initialSearchResults = {
  users: [],
  hashtags: [],
  descriptionCount: 0,
};

export interface SearchQueryParams {
  value: string;
}
