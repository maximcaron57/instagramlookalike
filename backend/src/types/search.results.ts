import { SimpleUser } from './users';
import { Hashtag } from './hashtags';

export interface SearchResults {
  users: SimpleUser[];
  hashtags: Hashtag[];
  descriptionCount: number;
}
