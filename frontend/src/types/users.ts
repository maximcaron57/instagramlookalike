export interface User {
  username: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName?: string;
  description?: string;
  avatarReference?: string;
  notifiedAt: Date;
  createdAt: Date;
}

export interface SimpleUser {
  username: string;
  firstName: string;
  lastName?: string;
  avatarReference?: string;
}

export interface UserModificationParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatarData?: string;
  notifiedAt?: Date;
}

export interface UserQueryParams {
  username?: string;
  after?: string;
  limit?: number;
}

export const userMaximumValues = {
  firstName: {
    length: { value: 50, message: 'First name must be 50 characters or less' },
  },
  lastName: {
    length: { value: 50, message: 'Last name must be 50 characters or less' },
  },
  description: {
    length: {
      value: 500,
      message: 'Description must be 500 characters or less',
    },
  },
  email: {
    length: {
      value: 320,
      message: 'Email length must be 320 characters or less',
    },
  },
};
