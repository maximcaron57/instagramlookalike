export interface Post {
  id: string;
  reference: string;
  thumbnail: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
  reactions: Reaction[];
  comments?: UserComment[];
  user: string;
  userAvatar?: string;
  createdAt: Date;
}

export interface PostCreationParams {
  data?: string;
  reference?: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
}

export interface PostModificationParams {
  description?: string;
  hashtags?: string[];
  usertags?: string[];
}

export interface PostQueryParams {
  description?: string;
  hashtag?: string;
  before?: string;
  limit?: number;
}
export interface Reaction {
  user: string;
  createdAt?: Date;
}

export interface UserComment {
  user: string;
  text: string;
  userAvatar?: string;
  createdAt?: Date;
}

export interface CommentCreationParams {
  text: string;
}

export const postMaximumValues = {
  description: {
    length: {
      value: 500,
      message: 'Description length must be 500 characters or less',
    },
  },
  usertags: {
    count: {
      value: 30,
      message: `Usertag count must be 30 or less`,
    },
  },
  hashtags: {
    count: {
      value: 30,
      message: 'Hashtag count must be 30 or less',
    },
    length: {
      value: 50,
      message: 'Hashtag length must be 50 characters or less',
    },
  },
};

export const userCommentMaximumValues = {
  text: {
    length: {
      value: 1000,
      message: 'Comment text length must be 1000 characters or less',
    },
  },
};
