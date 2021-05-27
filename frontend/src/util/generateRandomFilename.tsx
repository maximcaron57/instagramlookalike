import uuid from 'react-uuid';

export const generateRandomFilename = (filename: string): string => {
  if (!filename || filename === '') return '';

  const extension = filename.split('.').pop();

  if (!extension || extension === '' || extension === filename) return uuid();

  return `${uuid()}.${extension}`;
};
