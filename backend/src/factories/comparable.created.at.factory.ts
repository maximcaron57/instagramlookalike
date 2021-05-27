export const createComparableCreatedAt = (id: string, createdAt: Date) =>
  `${createdAt.toISOString()}${id}`;
