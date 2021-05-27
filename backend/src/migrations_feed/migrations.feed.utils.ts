const insertOneFakeDocument = (fields: any) => ({
  insertOne: {
    document: { ...fields, fake: true },
  },
});

export const insertManyFakeDocuments = (fieldsArray: Array<any>) =>
  fieldsArray.map((fields) => insertOneFakeDocument(fields));

export const deleteFakeDocuments = () => ({
  deleteMany: {
    filter: { fake: true },
  },
});
